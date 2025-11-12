import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';
import { Card } from '../components/molecules';

interface RentalState {
  rentalCode: string;
  stationId: number;
  stationName: string;
  pricingType: 'turn' | 'hourly' | 'daily' | 'monthly';
  duration: number;
  totalCost: number;
  startTime: Date;
  stationLat: number;
  stationLng: number;
}

const JourneyStartPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rentalState = location.state as RentalState | null;

  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // for timed rentals

  // Get rental info from state or use defaults
  const rentalCode = rentalState?.rentalCode || 'RENT-000001';
  const stationName = rentalState?.stationName || 'Trạm Đại học Bách Khoa';
  const pricingType = rentalState?.pricingType || 'turn';
  const totalCost = rentalState?.totalCost || 9000;
  const duration = rentalState?.duration || 0;
  const stationLat = rentalState?.stationLat || 10.772461;
  const stationLng = rentalState?.stationLng || 106.657223;

  // Calculate remaining time for timed rentals
  useEffect(() => {
    if (pricingType === 'turn') return; // No timer for turn-based rentals

    // Calculate total duration in seconds
    let totalDuration = 0;
    if (pricingType === 'hourly') {
      totalDuration = duration * 3600; // hours to seconds
    } else if (pricingType === 'daily') {
      totalDuration = duration * 24 * 3600; // days to seconds
    } else if (pricingType === 'monthly') {
      totalDuration = duration * 30 * 24 * 3600; // months to seconds
    }

    setRemainingTime(totalDuration);

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [pricingType, duration]);

  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days} ngày ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEndRental = () => {
    // Navigate to rating page with rental info
    navigate(`/rental/rate/${rentalCode}`, {
      state: {
        stationName,
        pricingType,
        cost: totalCost,
        duration: elapsedTime
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1-lg text-primary font-semibold">
          Bắt đầu hành trình
        </h1>
      </div>

      {/* Rental Info Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-emerald-50 to-primary/5 border-primary">
        <div className="space-y-6">
          {/* Bike and Station Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="bike" size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-h2 text-primary font-semibold">
                {rentalCode}
              </h2>
              <p className="text-caption text-text-secondary flex items-center gap-1">
                <Icon name="location" size={14} />
                {stationName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-caption text-text-secondary mb-1">Tổng chi phí</p>
              <p className="text-h2 font-bold text-primary">
                {totalCost.toLocaleString()}đ
              </p>
            </div>
          </div>

          {/* For turn-based rentals, show simple info */}
          {pricingType === 'turn' && (
            <div className="text-center py-6 border-t border-b border-primary/20 bg-white/50 rounded-xl">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full mb-2">
                <Icon name="ticket" size={24} className="text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">
                  Vé lượt
                </p>
              </div>
              <p className="text-body text-text-secondary mt-2">
                Không giới hạn thời gian trong ngày
              </p>
            </div>
          )}

          {/* For timed rentals, show countdown */}
          {pricingType !== 'turn' && (
            <div className="space-y-4">
              <div className="text-center py-6 border-t border-b border-primary/20 bg-white/50 rounded-xl">
                <p className="text-caption text-text-secondary mb-2 flex items-center justify-center gap-2">
                  <Icon name="clock" size={16} />
                  Thời gian còn lại
                </p>
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent font-mono tracking-wider mb-3">
                  {formatDuration(remainingTime)}
                </p>
                <p className="text-caption text-text-secondary">
                  Đã sử dụng: {formatDuration(elapsedTime)}
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-caption text-text-secondary">
                  <span>Tiến độ</span>
                  <span>
                    {Math.min(100, Math.round((elapsedTime / (elapsedTime + remainingTime)) * 100))}%
                  </span>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-emerald-600 h-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, (elapsedTime / (elapsedTime + remainingTime)) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Battery Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-caption text-text-secondary flex items-center gap-1">
                <Icon name="bolt" size={14} />
                Pin xe
              </span>
              <span className="text-body font-semibold text-primary">
                85%
              </span>
            </div>
            <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-600 h-full transition-all duration-300"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          {/* Warning for monthly plan */}
          {pricingType === 'monthly' && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 border-dashed rounded-card">
              <Icon name="warning" size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-caption text-amber-700">
                Gói tháng: Vui lòng trả xe tại trạm trước khi về nhà. Không được mang xe về nhà.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Google Maps Navigation */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h3 text-primary font-semibold flex items-center gap-2">
              <Icon name="location" size={20} />
              Bản đồ dẫn đường
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-caption font-medium">
              <Icon name="check-circle" size={14} />
              Đang hoạt động
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-sm">
            <iframe
              title="Google Maps Navigation"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${stationLat},${stationLng}&zoom=15`}
              allowFullScreen
            />
            {/* Overlay indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-caption font-medium text-primary">Vị trí trạm: {stationName}</span>
            </div>
          </div>

          <p className="text-caption text-text-secondary text-center">
            💡 Lưu ý: Đây là bản đồ minh họa. Vui lòng trả xe về đúng trạm đã thuê.
          </p>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center hover:shadow-lg hover:border-primary/40 transition-all duration-200 cursor-pointer">
          <div className="space-y-2 py-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="location" size={24} className="text-primary" />
            </div>
            <p className="text-body-md font-medium text-primary">Tìm trạm gần nhất</p>
          </div>
        </Card>

        <Card className="text-center hover:shadow-lg hover:border-primary/40 transition-all duration-200 cursor-pointer">
          <div className="space-y-2 py-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="support" size={24} className="text-primary" />
            </div>
            <p className="text-body-md font-medium text-primary">Hỗ trợ khẩn cấp</p>
          </div>
        </Card>
      </div>

      {/* End Rental Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => setShowEndConfirm(true)}
        className="sticky bottom-4 shadow-xl"
      >
        <Icon name="check-circle" size={18} />
        Kết thúc hành trình
      </Button>

      {/* Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="warning" size={32} className="text-amber-600" />
                </div>
                <h3 className="text-h2 text-primary font-semibold mb-2">
                  Kết thúc hành trình?
                </h3>
                <p className="text-body text-text-secondary">
                  Bạn có chắc chắn muốn kết thúc chuyến đi này không?
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-emerald-50 rounded-card p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-body text-text-secondary">Mã thuê xe:</span>
                  <span className="text-body font-semibold text-primary">{rentalCode}</span>
                </div>
                {pricingType !== 'turn' && (
                  <div className="flex justify-between">
                    <span className="text-body text-text-secondary">Thời gian sử dụng:</span>
                    <span className="text-body font-semibold text-primary">
                      {formatDuration(elapsedTime)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-primary/20 pt-2 mt-2">
                  <span className="text-body text-text-secondary">Tổng chi phí:</span>
                  <span className="text-h3 font-bold text-primary">
                    {totalCost.toLocaleString()}đ
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowEndConfirm(false)}
                >
                  <Icon name="arrow-left" size={16} />
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEndRental}
                >
                  <Icon name="check-circle" size={16} />
                  Xác nhận
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JourneyStartPage;

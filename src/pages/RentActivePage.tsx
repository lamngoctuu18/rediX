import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';
import { Card } from '../components/molecules';
import { calculateRentalCost, formatPrice, getPricingDetails } from '../utils/rentalPricing';

interface RentalState {
  rentalCode: string;
  stationId: number;
  stationName: string;
  pricingType: 'turn' | 'hourly' | 'daily' | 'monthly';
  duration: number;
  totalCost: number;
  startTime: Date;
}

const RentActivePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rentalState = location.state as RentalState | null;

  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Get rental info from state or use defaults
  const rentalCode = rentalState?.rentalCode || 'XĐ-001';
  const stationName = rentalState?.stationName || 'Trạm Hồ Gươm';
  const pricingType = rentalState?.pricingType || 'turn';
  const fixedCost = rentalState?.totalCost || 0;

  // Only track time for non-turn rentals
  useEffect(() => {
    if (pricingType === 'turn') return; // No timer for turn-based rentals

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [pricingType]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Map pricing type to match utility function expectations
  const utilPricingType = pricingType === 'daily' ? 'day' : pricingType === 'monthly' ? 'month' : pricingType;

  // For turn-based, use fixed cost. For time-based, calculate current cost
  const currentCost = pricingType === 'turn' ? fixedCost : calculateRentalCost(utilPricingType as 'turn' | 'hourly' | 'day' | 'month', Math.floor(elapsedTime / 60));
  const pricingDetails = getPricingDetails(utilPricingType as 'turn' | 'hourly' | 'day' | 'month');

  const handleEndRental = () => {
    // Navigate to rating page with rental info
    navigate(`/rental/rate/${rentalState?.rentalCode || 'default'}`, {
      state: {
        stationName,
        pricingType,
        cost: currentCost,
        duration: elapsedTime
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1-lg text-primary font-semibold">
          Đang thuê xe
        </h1>
      </div>

      {/* Active Rental Info */}
      <Card className="bg-primary-8 border-primary">
        <div className="space-y-6">
          {/* Bike Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <img 
                src="/logoride-Photoroom.png" 
                alt="RIDE X" 
                className="h-10 w-auto"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-h2 text-primary font-semibold">
                {rentalCode}
              </h2>
              <p className="text-caption text-text-secondary">
                {stationName}
              </p>
            </div>
          </div>

          {/* Timer - Only show for non-turn rentals */}
          {pricingType !== 'turn' && (
            <div className="text-center py-6 border-t border-b border-primary-16">
              <p className="text-caption text-text-secondary mb-2">
                Thời gian thuê
              </p>
              <p className="text-5xl font-bold text-primary font-mono tracking-wider">
                {formatDuration(elapsedTime)}
              </p>
            </div>
          )}

          {/* For turn-based rentals, show simple info */}
          {pricingType === 'turn' && (
            <div className="text-center py-6 border-t border-b border-primary-16">
              <p className="text-caption text-text-secondary mb-2">
                Loại vé
              </p>
              <p className="text-2xl font-bold text-primary">
                Vé lượt
              </p>
            </div>
          )}

          {/* Pricing Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-caption text-text-secondary mb-1">
                Gói thuê
              </p>
              <p className="text-body-md font-semibold text-primary">
                {pricingDetails?.label}
              </p>
            </div>
            <div>
              <p className="text-caption text-text-secondary mb-1">
                Chi phí hiện tại
              </p>
              <p className="text-body-md font-bold text-primary">
                {formatPrice(currentCost)}
              </p>
            </div>
          </div>

          {/* Battery Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-caption text-text-secondary">
                Pin xe
              </span>
              <span className="text-body font-semibold text-primary">
                85%
              </span>
            </div>
            <div className="w-full bg-primary-16 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          {/* Warning for monthly plan */}
          {pricingType === 'monthly' && (
            <div className="flex items-start gap-2 p-3 bg-white border border-primary border-dashed rounded-card">
              <Icon name="warning" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-caption text-primary">
                Gói tháng: Vui lòng trả xe tại trạm trước khi về nhà. Không được mang xe về nhà.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center hover:shadow-primary transition-shadow duration-200 cursor-pointer">
          <div className="space-y-2 py-2">
            <div className="w-12 h-12 bg-primary-16 rounded-full flex items-center justify-center mx-auto">
              <Icon name="location" size={24} className="text-primary" />
            </div>
            <p className="text-body-md font-medium text-primary">Tìm trạm</p>
          </div>
        </Card>

        <Card className="text-center hover:shadow-primary transition-shadow duration-200 cursor-pointer">
          <div className="space-y-2 py-2">
            <div className="w-12 h-12 bg-primary-16 rounded-full flex items-center justify-center mx-auto">
              <Icon name="support" size={24} className="text-primary" />
            </div>
            <p className="text-body-md font-medium text-primary">Hỗ trợ</p>
          </div>
        </Card>
      </div>

      {/* End Rental Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => setShowEndConfirm(true)}
      >
        Kết thúc thuê xe
      </Button>

      {/* Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="warning" size={32} className="text-primary" />
                </div>
                <h3 className="text-h2 text-primary font-semibold mb-2">
                  Kết thúc thuê xe?
                </h3>
                <p className="text-body text-text-secondary">
                  Bạn có chắc chắn muốn kết thúc chuyến đi này?
                </p>
              </div>

              <div className="bg-primary-8 rounded-card p-4">
                {pricingType !== 'turn' && (
                  <div className="flex justify-between mb-2">
                    <span className="text-body text-text-secondary">Thời gian:</span>
                    <span className="text-body font-semibold text-primary">
                      {formatDuration(elapsedTime)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-body text-text-secondary">Tổng chi phí:</span>
                  <span className="text-h2 font-bold text-primary">
                    {formatPrice(currentCost)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowEndConfirm(false)}
                >
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEndRental}
                >
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

export default RentActivePage;
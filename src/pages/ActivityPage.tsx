import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Badge } from '../components/atoms';
import { Card } from '../components/molecules';

type TabType = 'active' | 'history' | 'unrated';

interface RentalActivity {
  id: string;
  bikeId: string;
  bikeName: string;
  stationName: string;
  stationId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  cost: number;
  distance: number; // km
  status: 'active' | 'completed';
  rated: boolean;
  rating?: number;
}

// Mock data
const mockActivities: RentalActivity[] = [
  {
    id: 'RX00123456',
    bikeId: 'BIKE001',
    bikeName: 'XĐ-001',
    stationName: 'Trạm Đại học Bách Khoa',
    stationId: '1',
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    duration: 30,
    cost: 30000,
    distance: 2.5,
    status: 'active',
    rated: false
  },
  {
    id: 'RX00123455',
    bikeId: 'BIKE045',
    bikeName: 'XĐ-045',
    stationName: 'Trạm Công viên Lê Văn Tám',
    stationId: '2',
    startTime: new Date('2024-11-10T14:30:00'),
    endTime: new Date('2024-11-10T16:45:00'),
    duration: 135,
    cost: 135000,
    distance: 8.2,
    status: 'completed',
    rated: false
  },
  {
    id: 'RX00123454',
    bikeId: 'BIKE032',
    bikeName: 'XĐ-032',
    stationName: 'Trạm Metro Saigon Center',
    stationId: '3',
    startTime: new Date('2024-11-09T09:00:00'),
    endTime: new Date('2024-11-09T10:15:00'),
    duration: 75,
    cost: 75000,
    distance: 5.3,
    status: 'completed',
    rated: true,
    rating: 5
  },
  {
    id: 'RX00123453',
    bikeId: 'BIKE018',
    bikeName: 'XĐ-018',
    stationName: 'Trạm Đại học Bách Khoa',
    stationId: '1',
    startTime: new Date('2024-11-08T16:20:00'),
    endTime: new Date('2024-11-08T17:50:00'),
    duration: 90,
    cost: 90000,
    distance: 6.8,
    status: 'completed',
    rated: true,
    rating: 4
  },
  {
    id: 'RX00123452',
    bikeId: 'BIKE027',
    bikeName: 'XĐ-027',
    stationName: 'Trạm Công viên Lê Văn Tám',
    stationId: '2',
    startTime: new Date('2024-11-07T11:30:00'),
    endTime: new Date('2024-11-07T12:45:00'),
    duration: 75,
    cost: 75000,
    distance: 4.2,
    status: 'completed',
    rated: false
  }
];

const ActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const activeRentals = mockActivities.filter(a => a.status === 'active');
  const historyRentals = mockActivities.filter(a => a.status === 'completed');
  const unratedRentals = mockActivities.filter(a => a.status === 'completed' && !a.rated);

  const handleRentAgain = (stationId: string) => {
    navigate('/rent/start', {
      state: {
        selectedStationId: stationId,
        fromDashboard: true
      }
    });
  };

  const handleRate = (rentalId: string) => {
    navigate(`/rental/rate/${rentalId}`);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}p`;
    }
    return `${mins} phút`;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderActivityCard = (activity: RentalActivity) => (
    <Card key={activity.id} className="group hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              activity.status === 'active' 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                : 'bg-gradient-to-br from-primary/10 to-emerald-50'
            }`}>
              <Icon 
                name="bike" 
                size={24} 
                className={activity.status === 'active' ? 'text-white' : 'text-primary'} 
              />
            </div>
            <div>
              <h3 className="text-body-lg font-bold text-primary mb-1">
                {activity.bikeName}
              </h3>
              <p className="text-caption text-text-secondary">
                Mã: {activity.id}
              </p>
            </div>
          </div>
          
          {activity.status === 'active' ? (
            <Badge variant="filled" className="bg-green-500 text-white">
              Đang thuê
            </Badge>
          ) : activity.rated ? (
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <Icon name="star" size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-amber-700">{activity.rating}/5</span>
            </div>
          ) : (
            <Badge variant="outline" className="border-orange-300 text-orange-600">
              Chưa đánh giá
            </Badge>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Icon name="location" size={16} className="text-blue-600" />
            <div>
              <p className="text-xs text-blue-600">Trạm</p>
              <p className="text-xs font-semibold text-blue-700 truncate">{activity.stationName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
            <Icon name="clock" size={16} className="text-purple-600" />
            <div>
              <p className="text-xs text-purple-600">Thời gian</p>
              <p className="text-xs font-semibold text-purple-700">{formatDuration(activity.duration)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
            <Icon name="navigation" size={16} className="text-green-600" />
            <div>
              <p className="text-xs text-green-600">Quãng đường</p>
              <p className="text-xs font-semibold text-green-700">{activity.distance} km</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
            <Icon name="wallet" size={16} className="text-amber-600" />
            <div>
              <p className="text-xs text-amber-600">Chi phí</p>
              <p className="text-xs font-semibold text-amber-700">{activity.cost.toLocaleString()}đ</p>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="pt-3 border-t border-primary-16">
          <div className="flex items-center gap-2 text-caption text-text-secondary">
            <Icon name="calendar" size={14} />
            <span>Bắt đầu: {formatDate(activity.startTime)}</span>
            {activity.endTime && (
              <>
                <span>•</span>
                <span>Kết thúc: {formatDate(activity.endTime)}</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        {activity.status === 'completed' && (
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleRentAgain(activity.stationId)}
              className="flex-1"
            >
              <Icon name="refresh" size={16} />
              <span>Thuê lại</span>
            </Button>
            
            {!activity.rated && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleRate(activity.id)}
                className="flex-1"
              >
                <Icon name="star" size={16} />
                <span>Đánh giá</span>
              </Button>
            )}
            
            {activity.rated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRate(activity.id)}
                className="flex-1"
              >
                <Icon name="eye" size={16} />
                <span>Xem đánh giá</span>
              </Button>
            )}
          </div>
        )}

        {activity.status === 'active' && (
          <Button
            variant="primary"
            onClick={() => navigate('/rent/active')}
            className="w-full"
          >
            Xem chi tiết
            <Icon name="arrow-right" size={16} />
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-h1-lg text-primary font-bold mb-2">
          Hoạt động
        </h1>
        <p className="text-body-lg text-text-secondary">
          Quản lý lịch sử và hoạt động thuê xe của bạn
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-primary-8 rounded-xl">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'active'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon name="bike" size={18} />
            <span>Đang thuê</span>
            {activeRentals.length > 0 && (
              <Badge variant="filled" size="sm" className="bg-green-500 text-white">
                {activeRentals.length}
              </Badge>
            )}
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon name="clock" size={18} />
            <span>Lịch sử</span>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('unrated')}
          className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'unrated'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon name="star" size={18} />
            <span>Chưa đánh giá</span>
            {unratedRentals.length > 0 && (
              <Badge variant="filled" size="sm" className="bg-orange-500 text-white">
                {unratedRentals.length}
              </Badge>
            )}
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'active' && (
          <>
            {activeRentals.length > 0 ? (
              activeRentals.map(renderActivityCard)
            ) : (
              <Card className="text-center py-16 border-dashed border-2">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="bike" size={36} className="text-primary/50" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-text-primary mb-2">
                      Chưa có chuyến đi nào
                    </h3>
                    <p className="text-body text-text-secondary mb-4">
                      Bắt đầu chuyến đi xanh của bạn ngay hôm nay!
                    </p>
                    <Button variant="primary" onClick={() => navigate('/rent/start')}>
                      <Icon name="bike" size={18} />
                      Thuê xe ngay
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <>
            {historyRentals.length > 0 ? (
              historyRentals.map(renderActivityCard)
            ) : (
              <Card className="text-center py-16 border-dashed border-2">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="clock" size={36} className="text-primary/50" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-text-primary mb-2">
                      Chưa có lịch sử
                    </h3>
                    <p className="text-body text-text-secondary">
                      Lịch sử các chuyến đi của bạn sẽ xuất hiện tại đây
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

        {activeTab === 'unrated' && (
          <>
            {unratedRentals.length > 0 ? (
              <>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                  <Icon name="star" size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-1">
                      Bạn có {unratedRentals.length} chuyến đi chưa đánh giá
                    </h4>
                    <p className="text-sm text-orange-700">
                      Hãy chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện dịch vụ
                    </p>
                  </div>
                </div>
                {unratedRentals.map(renderActivityCard)}
              </>
            ) : (
              <Card className="text-center py-16 border-dashed border-2">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon name="check-circle" size={36} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-text-primary mb-2">
                      Tuyệt vời! 🎉
                    </h3>
                    <p className="text-body text-text-secondary">
                      Bạn đã đánh giá tất cả các chuyến đi
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityPage;

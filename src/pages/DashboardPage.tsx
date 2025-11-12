import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon, ProgressBar, Badge } from '../components/atoms';
import { Card } from '../components/molecules';
import { useAuth } from '../hooks/useAuth';
import stationsData from '../data/stations.json';

// Types
interface Station {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: number;
  totalBikes: number;
  availableBikes: number;
  batteryAvg: number;
  facilities: string[];
  workingHours: string;
  status: string;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  contact: {
    phone: string;
    email: string;
  };
  pricing: {
    perTurn: number;
    perHour: number;
    perDay: number;
    perMonth: number;
  };
}

const mockActiveRental = {
  id: '1',
  bikeId: 'BIKE001',
  startTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  cost: 15000,
  batteryLevel: 78
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeRental, setActiveRental] = useState<typeof mockActiveRental | null>(null);
  const [nearestStations] = useState<Station[]>(stationsData.stations.slice(0, 3) as Station[]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [stationImageIndexes, setStationImageIndexes] = useState<{[key: string]: number}>({});

  // Get all stations for search suggestions
  const allStations = stationsData.stations as Station[];

  // Filter stations based on search query
  const filteredStations = searchQuery
    ? allStations.filter(station =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : nearestStations;

  // Get search suggestions (top 5 matches)
  const searchSuggestions = searchQuery
    ? allStations
        .filter(station =>
          station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  // Handle station click - navigate to rent page
  const handleStationClick = (stationId: string) => {
    navigate('/rent/start', { 
      state: { 
        selectedStationId: stationId,
        fromDashboard: true 
      } 
    });
    setShowSuggestions(false);
    setSearchQuery('');
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update time every minute for active rental
  useEffect(() => {
    if (activeRental) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [activeRental]);

  const formatDuration = (startTime: Date, currentTime: Date): string => {
    const diffMs = currentTime.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${minutes} phút`;
  };

  const calculateCost = (startTime: Date, currentTime: Date): number => {
    const diffMs = currentTime.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return Math.max(diffMins * 1000, 5000); // 1000đ/phút, tối thiểu 5000đ
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1-lg text-primary font-bold mb-2">
          Xin chào, {user?.profile.name?.split(' ').pop()}! 👋
        </h1>
        <p className="text-body-lg text-text-secondary">
          Sẵn sàng cho chuyến đi xanh hôm nay?
        </p>
      </div>

      {/* Active Rental */}
      {activeRental && (
        <Card className="bg-primary-8 border-primary">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <img 
                    src="/logoride-Photoroom.png" 
                    alt="RIDE X" 
                    className="h-8 w-auto"
                  />
                </div>
                <div>
                  <h3 className="text-body-md font-medium text-primary">
                    Đang thuê xe #{activeRental.bikeId}
                  </h3>
                  <p className="text-caption text-text-secondary">
                    Bắt đầu lúc {activeRental.startTime.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <Badge variant="filled" size="md">
                Đang hoạt động
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-h2 text-primary font-semibold">
                  {formatDuration(activeRental.startTime, currentTime)}
                </p>
                <p className="text-caption text-text-secondary">Thời gian</p>
              </div>
              
              <div className="text-center">
                <p className="text-h2 text-primary font-semibold">
                  {calculateCost(activeRental.startTime, currentTime).toLocaleString()}đ
                </p>
                <p className="text-caption text-text-secondary">Chi phí tạm tính</p>
              </div>
              
              <div className="text-center">
                <p className="text-h2 text-primary font-semibold">
                  {activeRental.batteryLevel}%
                </p>
                <p className="text-caption text-text-secondary">Pin xe</p>
              </div>
            </div>

            <div className="space-y-2">
              <ProgressBar
                value={activeRental.batteryLevel}
                showLabel
                label="Pin xe"
                size="md"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="primary" fullWidth>
                <Link to="/rent/active" className="flex items-center justify-center gap-2 w-full">
                  <Icon name="eye" size={18} />
                  Xem chi tiết
                </Link>
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => setActiveRental(null)}
                className="px-4"
              >
                <Icon name="stop" size={18} />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="group relative overflow-hidden text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10" />
          <div className="relative space-y-3 py-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <Icon name="wallet" size={32} className="text-white" />
            </div>
            <div>
              <p className="text-h2 text-primary font-bold mb-1">
                {user?.walletBalance?.toLocaleString() || 0}đ
              </p>
              <p className="text-caption text-text-secondary font-medium">Số dư ví</p>
            </div>
          </div>
        </Card>

        <Card className="group relative overflow-hidden text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-400/5 rounded-full -mr-10 -mt-10" />
          <div className="relative space-y-3 py-2">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <Icon name="gift" size={32} className="text-white" />
            </div>
            <div>
              <p className="text-h2 text-orange-600 font-bold mb-1">
                {user?.points?.toLocaleString() || 0}
              </p>
              <p className="text-caption text-text-secondary font-medium">Điểm thưởng</p>
            </div>
          </div>
        </Card>

        <Card className="group relative overflow-hidden text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/5 rounded-full -mr-10 -mt-10" />
          <div className="relative space-y-3 py-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <Icon name="route" size={32} className="text-white" />
            </div>
            <div>
              <p className="text-h2 text-blue-600 font-bold mb-1">23</p>
              <p className="text-caption text-text-secondary font-medium">Chuyến đi</p>
            </div>
          </div>
        </Card>

        <Card className="group relative overflow-hidden text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/5 rounded-full -mr-10 -mt-10" />
          <div className="relative space-y-3 py-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <Icon name="clock" size={32} className="text-white" />
            </div>
            <div>
              <p className="text-h2 text-purple-600 font-bold mb-1">5.2h</p>
              <p className="text-caption text-text-secondary font-medium">Tổng thời gian</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      {!activeRental && (
        <div className="space-y-4">
          <h2 className="text-h2 text-primary font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Thao tác nhanh
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/rent/start" className="block group">
              <Card className="border-0 bg-gradient-to-br from-primary to-emerald-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon name="bike" size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-bold text-white mb-1">Thuê xe ngay</h3>
                      <p className="text-body-sm text-white/80">Bắt đầu chuyến đi xanh</p>
                    </div>
                  </div>
                  <Icon name="arrow-right" size={24} className="text-white/80 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
            
            <Link to="/wallet" className="block group">
              <Card className="border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon name="wallet" size={28} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-bold text-primary mb-1">Nạp tiền</h3>
                      <p className="text-body-sm text-text-secondary">Thêm số dư vào ví</p>
                    </div>
                  </div>
                  <Icon name="arrow-right" size={24} className="text-primary/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Nearest Stations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-h2 text-primary font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Trạm gần bạn
          </h2>
          
          <Link to="/rent/start" className="text-body-md text-primary hover:text-primary-hover font-medium flex items-center gap-1 group">
            <span>Xem tất cả</span>
            <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Search Station Input */}
        <div ref={searchRef} className="relative">
          <Card className="border-primary/20 bg-gradient-to-r from-white to-primary/5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <Icon name="search" size={22} />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm trạm theo tên hoặc địa điểm..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                className="w-full pl-14 pr-12 py-4 bg-transparent border-0 focus:outline-none text-body placeholder:text-text-secondary/60"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                >
                  <Icon name="x" size={16} />
                </button>
              )}
            </div>
          </Card>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <Card className="border-primary/20 shadow-lg max-h-96 overflow-y-auto">
                <div className="py-2">
                  <div className="px-4 py-2 text-caption text-text-secondary font-medium">
                    Gợi ý tìm kiếm ({searchSuggestions.length})
                  </div>
                  {searchSuggestions.map((station) => (
                    <button
                      key={station.id}
                      onClick={() => handleStationClick(station.id)}
                      className="w-full px-4 py-3 hover:bg-primary/5 transition-colors text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon name="location" size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-body-md font-semibold text-primary mb-1 group-hover:text-primary-hover transition-colors truncate">
                            {station.name}
                          </h4>
                          <p className="text-caption text-text-secondary mb-2 line-clamp-1">
                            {station.address}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              <Icon name="navigation" size={12} />
                              {station.distance}km
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              <Icon name="bike" size={12} />
                              {station.availableBikes}/{station.totalBikes} xe
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                              <Icon name="battery" size={12} />
                              {station.batteryAvg}%
                            </span>
                          </div>
                        </div>
                        <Icon name="arrow-right" size={18} className="text-primary/40 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* No Results */}
          {showSuggestions && searchQuery && searchSuggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <Card className="border-primary/20 shadow-lg">
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="search" size={28} className="text-primary/50" />
                  </div>
                  <p className="text-body text-text-secondary">
                    Không tìm thấy trạm phù hợp với "{searchQuery}"
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredStations.length > 0 ? (
            filteredStations.map((station) => (
            <Card 
              key={station.id} 
              className="group hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleStationClick(station.id)}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Icon + Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                      <Icon name="location" size={28} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{station.availableBikes}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-body-lg font-bold text-primary mb-1 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                      {station.name}
                      <Icon name="arrow-right" size={16} className="text-primary/40 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </h3>
                    <p className="text-caption text-text-secondary mb-2 line-clamp-1">
                      {station.address}
                    </p>
                    
                    {/* Rating Display */}
                    {station.rating && station.reviews && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Icon name="star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-caption font-bold text-primary">
                            {station.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-xs text-text-secondary">
                          ({station.reviews.toLocaleString()} đánh giá)
                        </span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-caption text-text-secondary">
                      <span className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-lg">
                        <Icon name="navigation" size={14} className="text-blue-600" />
                        <span className="font-medium text-blue-700">{station.distance}km</span>
                      </span>
                      <span className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-lg">
                        <Icon name="bike" size={14} className="text-green-600" />
                        <span className="font-medium text-green-700">{station.availableBikes}/{station.totalBikes} xe</span>
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg">
                        <Icon name="battery" size={14} className="text-amber-600" />
                        <span className="font-medium text-amber-700">{station.batteryAvg}%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Badge */}
                <div className="flex flex-col items-end gap-2">
                  {station.availableBikes > 0 ? (
                    <Badge variant="filled" size="sm" className="bg-green-500 text-white border-0 shadow-sm">
                      Có sẵn
                    </Badge>
                  ) : (
                    <Badge variant="outline" size="sm" className="border-red-300 text-red-600">
                      Hết xe
                    </Badge>
                  )}
                  
                  {station.batteryAvg < 25 && (
                    <div className="flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-lg border border-orange-200">
                      <Icon name="warning" size={12} />
                      <span className="font-medium">Pin thấp</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
          ) : (
            <Card className="text-center py-16 border-dashed border-2 border-primary/20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-emerald-50 rounded-full flex items-center justify-center">
                  <Icon name="search" size={36} className="text-primary/40" />
                </div>
                <div>
                  <h3 className="text-h3 font-bold text-text-primary mb-2">
                    Không tìm thấy trạm
                  </h3>
                  <p className="text-body text-text-secondary mb-4">
                    Thử tìm kiếm với từ khóa khác
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    <Icon name="refresh" size={16} />
                    <span>Xem tất cả trạm</span>
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-0">
        <div className="space-y-4">
          <h3 className="text-h3 font-bold text-primary flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            Hoạt động gần đây
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <Icon name="check" size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-body-md font-semibold text-primary group-hover:text-primary-hover transition-colors">
                  Hoàn thành chuyến #001234
                </p>
                <p className="text-caption text-text-secondary flex items-center gap-2">
                  <Icon name="clock" size={12} />
                  2 giờ trước • +15 điểm
                </p>
              </div>
              <p className="text-body-lg font-bold text-green-600">+25.000đ</p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-sm">
                <Icon name="plus" size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-body-md font-semibold text-primary group-hover:text-primary-hover transition-colors">
                  Nạp tiền vào ví
                </p>
                <p className="text-caption text-text-secondary flex items-center gap-2">
                  <Icon name="clock" size={12} />
                  1 ngày trước
                </p>
              </div>
              <p className="text-body-lg font-bold text-blue-600">+100.000đ</p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                <Icon name="gift" size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-body-md font-semibold text-primary group-hover:text-primary-hover transition-colors">
                  Đổi ưu đãi "Giảm 10%"
                </p>
                <p className="text-caption text-text-secondary flex items-center gap-2">
                  <Icon name="clock" size={12} />
                  2 ngày trước • -50 điểm
                </p>
              </div>
              <Badge variant="outline" size="sm">Đã sử dụng</Badge>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-primary-16 mt-4">
            <Link to="/profile" className="text-body-md text-primary hover:text-primary-hover font-medium inline-flex items-center gap-2 group">
              <span>Xem tất cả hoạt động</span>
              <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
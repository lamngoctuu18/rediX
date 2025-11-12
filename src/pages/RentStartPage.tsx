import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Icon, Badge } from '../components/atoms';
import { Card } from '../components/molecules';
import stationsData from '../data/stations.json';

// Define pricing types
const RENTAL_PRICING = [
  {
    type: 'turn' as const,
    label: 'Thuê theo lượt',
    description: 'Giá cố định cho một lượt đi',
    icon: 'bike',
    color: 'blue'
  },
  {
    type: 'hourly' as const,
    label: 'Thuê theo giờ',
    description: 'Linh hoạt cho chuyến đi ngắn',
    icon: 'clock',
    color: 'green'
  },
  {
    type: 'daily' as const,
    label: 'Thuê theo ngày',
    description: 'Thoải mái cả ngày dài',
    icon: 'calendar',
    color: 'purple'
  },
  {
    type: 'monthly' as const,
    label: 'Thuê theo tháng',
    description: 'Tiết kiệm cho người dùng thường xuyên',
    icon: 'star',
    color: 'orange'
  }
];

type PricingType = 'turn' | 'hourly' | 'daily' | 'monthly';

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
  pricing: {
    perTurn: number;
    perHour: number;
    perDay: number;
    perMonth: number;
  };
  images?: string[];
  rating?: number;
  reviews?: number;
}

const RentStartPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { selectedStationId?: string; fromDashboard?: boolean } | null;
  
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [selectedDestinationStation, setSelectedDestinationStation] = useState<string>(''); // New state for turn-based destination
  const [selectedPricing, setSelectedPricing] = useState<PricingType>('hourly');
  const [selectedHours, setSelectedHours] = useState(1);
  const [selectedDays, setSelectedDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [rentalCode, setRentalCode] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchDestination, setSearchDestination] = useState(''); // New state for searching destination stations

  // Get station details
  const stationDetails = useMemo(() => {
    return stationsData.stations.find(s => s.id === selectedStation) as Station | undefined;
  }, [selectedStation]);

  // Get destination station details (for turn-based pricing)
  const destinationStationDetails = useMemo(() => {
    return stationsData.stations.find(s => s.id === selectedDestinationStation) as Station | undefined;
  }, [selectedDestinationStation]);

  // Auto-select station if coming from dashboard
  useEffect(() => {
    if (state?.selectedStationId && state?.fromDashboard) {
      setSelectedStation(state.selectedStationId);
      setSelectedPricing('hourly');
    }
  }, [state]);

  // Calculate total cost
  const totalCost = useMemo(() => {
    if (!stationDetails) return 0;
    
    switch (selectedPricing) {
      case 'turn':
        return stationDetails.pricing.perTurn;
      case 'hourly':
        return stationDetails.pricing.perHour * selectedHours;
      case 'daily':
        return stationDetails.pricing.perDay * selectedDays;
      case 'monthly':
        return stationDetails.pricing.perMonth;
      default:
        return 0;
    }
  }, [stationDetails, selectedPricing, selectedHours, selectedDays]);

  const handleStartRental = () => {
    if (!selectedStation) {
      alert('Vui lòng chọn trạm xe');
      return;
    }
    // For turn-based pricing, require destination station
    if (selectedPricing === 'turn' && !selectedDestinationStation) {
      alert('Vui lòng chọn trạm đến cho vé lượt');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmRental = () => {
    setShowConfirmModal(false);
    // Generate invoice ID and rental code
    const invoice = 'INV' + Date.now().toString().slice(-8);
    const code = 'RX' + Date.now().toString().slice(-8);
    setInvoiceId(invoice);
    setRentalCode(code);
    setShowInvoiceModal(true);
  };

  const handlePayment = () => {
    setShowInvoiceModal(false);
    setShowPaymentModal(true);
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      // 90% success rate for demo
      const success = Math.random() > 0.1;
      setPaymentSuccess(success);
    }, 2000);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    if (paymentSuccess && stationDetails) {
      // Navigate to Journey Start page with rental info
      navigate('/journey/start', {
        state: {
          rentalCode,
          stationId: selectedStation,
          stationName: stationDetails.name,
          pricingType: selectedPricing,
          duration: selectedPricing === 'hourly' ? selectedHours : selectedPricing === 'daily' ? selectedDays : selectedPricing === 'monthly' ? 1 : 0,
          totalCost,
          startTime: new Date(),
          stationLat: stationDetails.location.lat,
          stationLng: stationDetails.location.lng
        }
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1-lg text-primary font-bold mb-2">
            Thuê xe đạp điện
          </h1>
          <p className="text-body text-text-secondary">
            Chọn trạm và gói thuê phù hợp với bạn
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <Icon name="x" size={20} />
        </Button>
      </div>

      {/* Selected Station Info */}
      {stationDetails && (
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-50">
          <div className="space-y-4">
            {/* Station Images Grid - Display all 3 images */}
            {stationDetails.images && stationDetails.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                {stationDetails.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${stationDetails.name} - Ảnh ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/10b981/ffffff?text=Image+' + (index + 1);
                      }}
                    />
                    {/* Zoom indicator */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/0 group-hover:bg-white/90 rounded-full flex items-center justify-center transition-all">
                        <Icon name="search" size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon name="location" size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-h2 text-primary font-bold mb-2">
                  {stationDetails.name}
                </h2>
                <p className="text-body text-text-secondary mb-3 flex items-center gap-2">
                  <Icon name="map" size={16} />
                  {stationDetails.address}
                </p>
                
                {/* Rating Display */}
                {stationDetails.rating && stationDetails.reviews && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="star" size={18} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-body font-bold text-primary">
                        {stationDetails.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-caption text-text-secondary">
                      ({stationDetails.reviews.toLocaleString()} đánh giá)
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Badge variant="filled" className="bg-blue-500 text-white">
                    <Icon name="navigation" size={14} />
                    {stationDetails.distance} km
                  </Badge>
                  <Badge variant="filled" className="bg-green-500 text-white">
                    <Icon name="bike" size={14} />
                    {stationDetails.availableBikes}/{stationDetails.totalBikes} xe
                  </Badge>
                  <Badge variant="filled" className="bg-amber-500 text-white">
                    <Icon name="battery" size={14} />
                    Pin TB: {stationDetails.batteryAvg}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border-2 border-white shadow-lg">
              <iframe
                title="Bản đồ trạm xe"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${stationDetails.location.lat},${stationDetails.location.lng}&zoom=15`}
              />
            </div>
          </div>
        </Card>
      )}

      {/* No Station Selected */}
      {!stationDetails && (
        <Card className="border-2 border-dashed border-primary/30">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="location" size={40} className="text-primary/50" />
            </div>
            <h3 className="text-h3 font-bold text-text-primary mb-2">
              Chưa chọn trạm xe
            </h3>
            <p className="text-body text-text-secondary mb-4">
              Vui lòng quay lại trang chủ để chọn trạm xe
            </p>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              <Icon name="arrow-left" size={18} />
              Quay lại trang chủ
            </Button>
          </div>
        </Card>
      )}

      {/* Pricing Options */}
      {stationDetails && (
        <>
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  1
                </div>
                <h2 className="text-h2 text-primary font-bold">
                  Chọn gói thuê xe
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RENTAL_PRICING.map((pricing) => {
                  const isSelected = selectedPricing === pricing.type;
                  const price = stationDetails.pricing[
                    pricing.type === 'turn' ? 'perTurn' :
                    pricing.type === 'hourly' ? 'perHour' :
                    pricing.type === 'daily' ? 'perDay' : 'perMonth'
                  ];

                  return (
                    <div
                      key={pricing.type}
                      onClick={() => setSelectedPricing(pricing.type)}
                      className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group ${
                        isSelected
                          ? 'border-primary bg-gradient-to-br from-primary/10 to-emerald-50 shadow-lg scale-105'
                          : 'border-primary/20 hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="check" size={18} className="text-white" />
                        </div>
                      )}
                      
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                        isSelected 
                          ? 'bg-gradient-to-br from-primary to-emerald-600' 
                          : 'bg-primary/10 group-hover:bg-primary/20'
                      }`}>
                        <Icon name={pricing.icon} size={28} className={isSelected ? 'text-white' : 'text-primary'} />
                      </div>

                      <h3 className="text-h3 font-bold text-primary mb-2">
                        {pricing.label}
                      </h3>
                      <p className="text-caption text-text-secondary mb-4">
                        {pricing.description}
                      </p>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {price.toLocaleString()}đ
                        </span>
                        <span className="text-caption text-text-secondary">
                          /{pricing.type === 'turn' ? 'lượt' : pricing.type === 'hourly' ? 'giờ' : pricing.type === 'daily' ? 'ngày' : 'tháng'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Destination Station Selection - Only for Turn Pricing */}
          {selectedPricing === 'turn' && (
            <Card>
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg text-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h2 className="text-h2 text-primary font-bold mb-0.5">
                      Chọn trạm đến
                    </h2>
                    <p className="text-caption text-text-secondary">
                      Vui lòng chọn trạm đến để hoàn thành lượt đi của bạn
                    </p>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none z-10">
                    <Icon name="search" size={18} className="text-primary/60 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm trạm theo tên hoặc địa chỉ..."
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gradient-to-r from-primary/5 to-emerald-50/50 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-body placeholder:text-text-secondary/60"
                  />
                  {searchDestination && (
                    <button
                      onClick={() => setSearchDestination('')}
                      className="absolute inset-y-0 right-2.5 flex items-center text-text-secondary hover:text-primary transition-all hover:scale-110"
                    >
                      <div className="w-7 h-7 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center">
                        <Icon name="x" size={16} />
                      </div>
                    </button>
                  )}
                </div>

                {/* Stations List */}
                <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1 py-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30">
                  {stationsData.stations
                    .filter(station => station.id !== selectedStation) // Exclude current station
                    .filter(station => {
                      // Filter by search term
                      if (!searchDestination) return true;
                      const searchLower = searchDestination.toLowerCase();
                      return (
                        station.name.toLowerCase().includes(searchLower) ||
                        station.address.toLowerCase().includes(searchLower)
                      );
                    })
                    .length === 0 ? (
                      // No results message
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                          <Icon name="search" size={32} className="text-primary/40" />
                        </div>
                        <h4 className="text-h3 font-bold text-primary mb-1.5">
                          Không tìm thấy trạm
                        </h4>
                        <p className="text-body text-text-secondary">
                          Thử tìm kiếm với từ khóa khác
                        </p>
                      </div>
                    ) : (
                      stationsData.stations
                        .filter(station => station.id !== selectedStation) // Exclude current station
                        .filter(station => {
                          // Filter by search term
                          if (!searchDestination) return true;
                          const searchLower = searchDestination.toLowerCase();
                          return (
                            station.name.toLowerCase().includes(searchLower) ||
                            station.address.toLowerCase().includes(searchLower)
                          );
                        })
                        .map((station) => {
                      const isSelected = selectedDestinationStation === station.id;
                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedDestinationStation(station.id)}
                          className={`group relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 overflow-visible ${
                            isSelected
                              ? 'border-primary bg-gradient-to-br from-primary/10 via-emerald-50/50 to-primary/5 shadow-lg ring-2 ring-primary/20'
                              : 'border-primary/10 bg-white hover:border-primary/40 hover:shadow-md hover:bg-gradient-to-br hover:from-primary/5 hover:to-emerald-50/30'
                          }`}
                        >
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                              <Icon name="check" size={14} className="text-white" />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3">
                            {/* Station icon */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                              isSelected 
                                ? 'bg-gradient-to-br from-primary to-emerald-600 shadow-md' 
                                : 'bg-primary/10 group-hover:bg-primary/20'
                            }`}>
                              <Icon name="location" size={20} className={isSelected ? 'text-white' : 'text-primary'} />
                            </div>

                            {/* Station info */}
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-body-lg font-bold mb-1 truncate transition-colors ${
                                isSelected ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                              }`}>
                                {station.name}
                              </h4>
                              <p className="text-caption text-text-secondary flex items-center gap-1 truncate">
                                <Icon name="map" size={13} className="flex-shrink-0" />
                                <span>{station.address}</span>
                              </p>
                            </div>

                            {/* Distance badge */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className={`px-2.5 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-1.5 transition-all ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-primary to-emerald-600 text-white shadow-md' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white group-hover:shadow-sm'
                              }`}>
                                <Icon name="navigation" size={13} />
                                <span>{station.distance} km</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Duration Selection */}
          {(selectedPricing === 'hourly' || selectedPricing === 'daily') && (
            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    2
                  </div>
                  <h2 className="text-h2 text-primary font-bold">
                    Chọn thời lượng
                  </h2>
                </div>

                {selectedPricing === 'hourly' && (
                  <div className="space-y-4">
                    <label className="text-body font-medium text-text-primary">
                      Số giờ thuê
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {[1, 2, 3, 4, 6, 8].map((hours) => (
                        <button
                          key={hours}
                          onClick={() => setSelectedHours(hours)}
                          className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                            selectedHours === hours
                              ? 'bg-primary text-white shadow-lg scale-105'
                              : 'bg-primary/10 text-primary hover:bg-primary/20'
                          }`}
                        >
                          {hours}h
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPricing === 'daily' && (
                  <div className="space-y-4">
                    <label className="text-body font-medium text-text-primary">
                      Số ngày thuê
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {[1, 2, 3, 5, 7, 10].map((days) => (
                        <button
                          key={days}
                          onClick={() => setSelectedDays(days)}
                          className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                            selectedDays === days
                              ? 'bg-primary text-white shadow-lg scale-105'
                              : 'bg-primary/10 text-primary hover:bg-primary/20'
                          }`}
                        >
                          {days} ngày
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Summary & Confirm */}
          <Card className="sticky bottom-4 border-2 border-primary/30 shadow-2xl">
            <div className="space-y-4">
              <h3 className="text-h3 font-bold text-primary">
                Tổng quan thuê xe
              </h3>

              <div className="space-y-3 py-4 border-y border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="text-body text-text-secondary">Trạm thuê:</span>
                  <span className="text-body font-semibold text-primary">{stationDetails.name}</span>
                </div>
                {selectedPricing === 'turn' && selectedDestinationStation && (
                  <div className="flex justify-between items-center">
                    <span className="text-body text-text-secondary">Trạm đến:</span>
                    <span className="text-body font-semibold text-primary">{destinationStationDetails?.name}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-body text-text-secondary">Gói thuê:</span>
                  <span className="text-body font-semibold text-primary">
                    {RENTAL_PRICING.find(p => p.type === selectedPricing)?.label}
                  </span>
                </div>
                {selectedPricing === 'hourly' && (
                  <div className="flex justify-between items-center">
                    <span className="text-body text-text-secondary">Thời lượng:</span>
                    <span className="text-body font-semibold text-primary">{selectedHours} giờ</span>
                  </div>
                )}
                {selectedPricing === 'daily' && (
                  <div className="flex justify-between items-center">
                    <span className="text-body text-text-secondary">Thời lượng:</span>
                    <span className="text-body font-semibold text-primary">{selectedDays} ngày</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center py-4 bg-primary/5 rounded-xl px-4">
                <span className="text-h3 font-bold text-primary">Tổng tiền:</span>
                <span className="text-3xl font-bold text-primary">
                  {totalCost.toLocaleString()}đ
                </span>
              </div>

              <Button
                variant="primary"
                onClick={handleStartRental}
                disabled={loading}
                className="w-full text-lg py-6"
              >
                {loading ? (
                  <>
                    <Icon name="refresh" size={20} className="animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Icon name="check" size={20} />
                    Xác nhận thuê xe
                  </>
                )}
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && stationDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="info" size={32} className="text-primary" />
                </div>
                <h3 className="text-h3 font-bold text-primary mb-2">
                  Xác nhận thuê xe
                </h3>
                <p className="text-body text-text-secondary">
                  Bạn có chắc chắn muốn thuê xe với thông tin sau?
                </p>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-body text-text-secondary">Trạm:</span>
                  <span className="text-body font-semibold">{stationDetails.name}</span>
                </div>
                {selectedPricing === 'turn' && destinationStationDetails && (
                  <div className="flex justify-between">
                    <span className="text-body text-text-secondary">Trạm đến:</span>
                    <span className="text-body font-semibold">{destinationStationDetails.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-body text-text-secondary">Gói:</span>
                  <span className="text-body font-semibold">
                    {RENTAL_PRICING.find(p => p.type === selectedPricing)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body text-text-secondary">Tổng:</span>
                  <span className="text-h3 font-bold text-primary">{totalCost.toLocaleString()}đ</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirmRental}
                  className="flex-1"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && stationDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="max-w-2xl w-full my-8">
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="text-center border-b border-primary/20 pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="file-text" size={40} className="text-white" />
                </div>
                <h2 className="text-h2 font-bold text-primary mb-2">
                  Hóa đơn thanh toán
                </h2>
                <p className="text-body text-text-secondary">
                  Vui lòng kiểm tra thông tin và thanh toán
                </p>
              </div>

              {/* Invoice Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption text-text-secondary mb-1">Mã hóa đơn</p>
                    <p className="text-body font-bold text-primary">{invoiceId}</p>
                  </div>
                  <div>
                    <p className="text-caption text-text-secondary mb-1">Mã thuê xe</p>
                    <p className="text-body font-bold text-primary">{rentalCode}</p>
                  </div>
                  <div>
                    <p className="text-caption text-text-secondary mb-1">Ngày tạo</p>
                    <p className="text-body font-semibold">{new Date().toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-caption text-text-secondary mb-1">Giờ tạo</p>
                    <p className="text-body font-semibold">{new Date().toLocaleTimeString('vi-VN')}</p>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-4">
                  <h4 className="text-body-lg font-bold text-primary mb-3">Thông tin thuê xe</h4>
                  <div className="space-y-3 bg-primary/5 rounded-xl p-4">
                    <div className="flex justify-between">
                      <span className="text-body text-text-secondary">Trạm thuê:</span>
                      <span className="text-body font-semibold text-right max-w-xs">{stationDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body text-text-secondary">Địa chỉ:</span>
                      <span className="text-body font-medium text-right max-w-xs">{stationDetails.address}</span>
                    </div>
                    {selectedPricing === 'turn' && destinationStationDetails && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-body text-text-secondary">Trạm đến:</span>
                          <span className="text-body font-semibold text-right max-w-xs">{destinationStationDetails.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-body text-text-secondary">Địa chỉ đến:</span>
                          <span className="text-body font-medium text-right max-w-xs">{destinationStationDetails.address}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-body text-text-secondary">Gói thuê:</span>
                      <span className="text-body font-semibold">{RENTAL_PRICING.find(p => p.type === selectedPricing)?.label}</span>
                    </div>
                    {selectedPricing === 'hourly' && (
                      <div className="flex justify-between">
                        <span className="text-body text-text-secondary">Thời lượng:</span>
                        <span className="text-body font-semibold">{selectedHours} giờ</span>
                      </div>
                    )}
                    {selectedPricing === 'daily' && (
                      <div className="flex justify-between">
                        <span className="text-body text-text-secondary">Thời lượng:</span>
                        <span className="text-body font-semibold">{selectedDays} ngày</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-4">
                  <h4 className="text-body-lg font-bold text-primary mb-3">Chi tiết thanh toán</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-body text-text-secondary">Đơn giá:</span>
                      <span className="text-body font-medium">
                        {stationDetails.pricing[
                          selectedPricing === 'turn' ? 'perTurn' :
                          selectedPricing === 'hourly' ? 'perHour' :
                          selectedPricing === 'daily' ? 'perDay' : 'perMonth'
                        ].toLocaleString()}đ
                      </span>
                    </div>
                    {(selectedPricing === 'hourly' || selectedPricing === 'daily') && (
                      <div className="flex justify-between">
                        <span className="text-body text-text-secondary">
                          {selectedPricing === 'hourly' ? `Số giờ: ${selectedHours}` : `Số ngày: ${selectedDays}`}
                        </span>
                        <span className="text-body font-medium">x {selectedPricing === 'hourly' ? selectedHours : selectedDays}</span>
                      </div>
                    )}
                    <div className="border-t border-primary/20 pt-2 mt-2">
                      <div className="flex justify-between items-center bg-gradient-to-r from-primary/10 to-emerald-50 rounded-xl p-4">
                        <span className="text-h3 font-bold text-primary">Tổng cộng:</span>
                        <span className="text-3xl font-bold text-primary">{totalCost.toLocaleString()}đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-primary/20">
                <Button
                  variant="ghost"
                  onClick={() => setShowInvoiceModal(false)}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={handlePayment}
                  className="flex-1"
                >
                  <Icon name="credit-card" size={18} />
                  Thanh toán
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="text-center py-8">
              {loading ? (
                <>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Icon name="credit-card" size={40} className="text-primary animate-bounce" />
                  </div>
                  <h3 className="text-h3 font-bold text-primary mb-2">
                    Đang xử lý thanh toán...
                  </h3>
                  <p className="text-body text-text-secondary">
                    Vui lòng chờ trong giây lát
                  </p>
                </>
              ) : paymentSuccess ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="check-circle" size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-h3 font-bold text-green-600 mb-2">
                    Thanh toán thành công!
                  </h3>
                  <p className="text-body text-text-secondary mb-6">
                    Mã thuê xe của bạn: <span className="font-bold text-primary">{rentalCode}</span>
                  </p>
                  <Button
                    variant="primary"
                    onClick={handlePaymentComplete}
                    className="w-full"
                  >
                    <Icon name="bike" size={18} />
                    Bắt đầu thuê xe
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="x-circle" size={40} className="text-red-600" />
                  </div>
                  <h3 className="text-h3 font-bold text-red-600 mb-2">
                    Thanh toán thất bại
                  </h3>
                  <p className="text-body text-text-secondary mb-6">
                    Vui lòng thử lại hoặc kiểm tra số dư tài khoản
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1"
                    >
                      Đóng
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowPaymentModal(false);
                        setShowInvoiceModal(true);
                      }}
                      className="flex-1"
                    >
                      Thử lại
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon name="x" size={24} className="text-white" />
            </button>
            
            {/* Image */}
            <img 
              src={selectedImage} 
              alt="Station view"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
              <p className="text-white text-center font-medium">
                Click bên ngoài để đóng
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default RentStartPage;

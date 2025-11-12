import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';
import { Card } from '../components/molecules';

interface RatingCategory {
  id: string;
  label: string;
  icon: string;
  rating: number;
}

const RatingPage: React.FC = () => {
  const navigate = useNavigate();
  const { rentalId } = useParams<{ rentalId: string }>();
  
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const [categories, setCategories] = useState<RatingCategory[]>([
    { id: 'bike-quality', label: 'Chất lượng xe', icon: 'bike', rating: 0 },
    { id: 'cleanliness', label: 'Vệ sinh', icon: 'sparkles', rating: 0 },
    { id: 'price', label: 'Giá cả', icon: 'wallet', rating: 0 },
    { id: 'service', label: 'Dịch vụ', icon: 'users', rating: 0 }
  ]);

  // Mock rental data
  const rental = {
    id: rentalId || 'RX00123456',
    bikeId: 'BIKE045',
    bikeName: 'XĐ-045',
    stationName: 'Trạm Công viên Lê Văn Tám',
    startTime: new Date('2024-11-10T14:30:00'),
    endTime: new Date('2024-11-10T16:45:00'),
    duration: 135,
    cost: 135000,
    distance: 8.2
  };

  const handleCategoryRating = (categoryId: string, rating: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, rating } : cat
      )
    );
  };

  const handleSubmit = () => {
    // TODO: Submit rating to API
    const ratingData = {
      rentalId,
      overallRating,
      categories: categories.reduce((acc, cat) => ({
        ...acc,
        [cat.id]: cat.rating
      }), {}),
      comment
    };
    
    console.log('Submitting rating:', ratingData);
    
    // Show success message and navigate back
    navigate('/activity', { 
      state: { 
        message: 'Cảm ơn bạn đã đánh giá! Ý kiến của bạn rất quan trọng với chúng tôi.' 
      }
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}p`;
    }
    return `${mins} phút`;
  };

  const StarRating: React.FC<{
    rating: number;
    onRate: (rating: number) => void;
    size?: number;
    showLabel?: boolean;
  }> = ({ rating, onRate, size = 32, showLabel = false }) => {
    const [hover, setHover] = useState(0);

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRate(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Icon
                name="star"
                size={size}
                className={`transition-colors ${
                  star <= (hover || rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {showLabel && (hover || rating) > 0 && (
          <span className="text-sm font-medium text-text-secondary">
            {hover || rating}/5
          </span>
        )}
      </div>
    );
  };

  const ratingLabels = [
    'Rất tệ',
    'Tệ',
    'Bình thường',
    'Tốt',
    'Tuyệt vời'
  ];

  const canSubmit = overallRating > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/activity')}
          className="!p-2"
        >
          <Icon name="arrow-left" size={20} />
        </Button>
        <div>
          <h1 className="text-h1-lg text-primary font-bold">
            Đánh giá chuyến đi
          </h1>
          <p className="text-body text-text-secondary">
            Chia sẻ trải nghiệm của bạn
          </p>
        </div>
      </div>

      {/* Rental Info Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-emerald-50">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center flex-shrink-0">
            <Icon name="bike" size={28} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-h3 font-bold text-primary mb-1">
              {rental.bikeName}
            </h3>
            <p className="text-caption text-text-secondary mb-3">
              Mã chuyến đi: {rental.id}
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-caption text-text-secondary">
                <Icon name="location" size={14} />
                <span className="truncate">{rental.stationName}</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-text-secondary">
                <Icon name="clock" size={14} />
                <span>{formatDuration(rental.duration)}</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-text-secondary">
                <Icon name="navigation" size={14} />
                <span>{rental.distance} km</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-text-secondary">
                <Icon name="wallet" size={14} />
                <span>{rental.cost.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Overall Rating */}
      <Card>
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-h3 font-bold text-primary mb-2">
              Đánh giá tổng quan
            </h3>
            <p className="text-body text-text-secondary">
              Bạn cảm thấy như thế nào về chuyến đi này?
            </p>
          </div>
          
          <div className="flex justify-center">
            <StarRating
              rating={overallRating}
              onRate={setOverallRating}
              size={40}
            />
          </div>
          
          {overallRating > 0 && (
            <div className="inline-block px-4 py-2 bg-amber-50 rounded-lg">
              <p className="text-body-lg font-semibold text-amber-700">
                {ratingLabels[overallRating - 1]}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Category Ratings */}
      <Card>
        <h3 className="text-h3 font-bold text-primary mb-4">
          Đánh giá chi tiết
        </h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 rounded-lg bg-primary-8 hover:bg-primary-16 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Icon name={category.icon} size={20} className="text-primary" />
                </div>
                <span className="font-medium text-text-primary">
                  {category.label}
                </span>
              </div>
              <StarRating
                rating={category.rating}
                onRate={(rating) => handleCategoryRating(category.id, rating)}
                size={24}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Comment */}
      <Card>
        <h3 className="text-h3 font-bold text-primary mb-4">
          Nhận xét của bạn
        </h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ thêm về trải nghiệm của bạn... (tùy chọn)"
          className="w-full min-h-[120px] p-4 rounded-lg border border-primary-32 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-caption text-text-secondary">
            {comment.length}/500 ký tự
          </p>
          {comment.length > 0 && (
            <button
              onClick={() => setComment('')}
              className="text-caption text-primary hover:underline"
            >
              Xóa
            </button>
          )}
        </div>
      </Card>

      {/* Submit Button */}
      <div className="sticky bottom-0 pb-4 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full"
        >
          <Icon name="send" size={18} />
          <span>Gửi đánh giá</span>
        </Button>
        {!canSubmit && (
          <p className="text-caption text-center text-text-secondary mt-2">
            Vui lòng chọn đánh giá tổng quan
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingPage;

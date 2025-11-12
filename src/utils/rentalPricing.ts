// Rental pricing configuration
export interface RentalPricing {
  type: 'turn' | 'hourly' | 'day' | 'month';
  label: string;
  price: number;
  unit: string;
  description?: string;
  maxDuration?: number; // in minutes
  restrictions?: string;
  allowCustomHours?: boolean;
}

export const RENTAL_PRICING: RentalPricing[] = [
  {
    type: 'turn',
    label: 'Theo lượt',
    price: 9000,
    unit: 'lượt',
    description: 'Giá cố định mỗi lượt thuê',
    maxDuration: 60 // 1 hour max for turn-based
  },
  {
    type: 'hourly',
    label: 'Theo giờ',
    price: 19000,
    unit: 'giờ',
    description: 'Chọn số giờ thuê, tính theo từng giờ',
    allowCustomHours: true
  },
  {
    type: 'day',
    label: 'Theo ngày',
    price: 90000,
    unit: 'ngày',
    description: '480 phút/ngày (8 giờ)',
    maxDuration: 480
  },
  {
    type: 'month',
    label: 'Theo tháng',
    price: 299000,
    unit: 'tháng',
    description: 'Không giới hạn lượt đi từ ga đến trường trong 1 ngày',
    restrictions: 'Không được mang xe về nhà'
  }
];

// Calculate rental cost based on duration and pricing type
export const calculateRentalCost = (
  pricingType: RentalPricing['type'],
  durationInMinutes: number,
  customHours?: number
): number => {
  const pricing = RENTAL_PRICING.find(p => p.type === pricingType);
  if (!pricing) return 0;

  switch (pricingType) {
    case 'turn':
      return pricing.price;
    
    case 'hourly':
      if (customHours) {
        return pricing.price * customHours;
      }
      const hours = Math.ceil(durationInMinutes / 60);
      return pricing.price * hours;
    
    case 'day':
      const days = Math.ceil(durationInMinutes / 480);
      return pricing.price * days;
    
    case 'month':
      return pricing.price;
    
    default:
      return 0;
  }
};

// Get pricing details
export const getPricingDetails = (type: RentalPricing['type']) => {
  return RENTAL_PRICING.find(p => p.type === type);
};

// Format price to Vietnamese currency
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('vi-VN')}đ`;
};

// Validate rental duration for pricing type
export const validateRentalDuration = (
  pricingType: RentalPricing['type'],
  durationInMinutes: number
): { valid: boolean; message?: string } => {
  const pricing = RENTAL_PRICING.find(p => p.type === pricingType);
  if (!pricing) {
    return { valid: false, message: 'Loại giá không hợp lệ' };
  }

  if (pricing.maxDuration && durationInMinutes > pricing.maxDuration) {
    return {
      valid: false,
      message: `Thời gian thuê vượt quá giới hạn ${pricing.maxDuration} phút cho gói ${pricing.label}`
    };
  }

  return { valid: true };
};

const rentalPricingUtils = {
  RENTAL_PRICING,
  calculateRentalCost,
  getPricingDetails,
  formatPrice,
  validateRentalDuration
};

export default rentalPricingUtils;

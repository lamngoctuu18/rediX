// User Types
export interface User {
  id: string;
  segment: 'student' | 'resident' | 'worker' | 'visitor' | 'admin';
  profile: UserProfile;
  walletBalance: number;
  points: number;
  status: 'Active' | 'Suspended' | 'PendingVerification';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  cccd: string;
  dateOfBirth: string;
  avatar?: string;
}

// Station Types
export interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  capacity: number;
  availableBikes: number;
  avgBattery: number;
  status: 'Operational' | 'Maintenance' | 'LowCapacity';
  distance?: number; // Calculated distance from user
}

// Bike Types
export interface Bike {
  id: string;
  stationId: string;
  batteryLevel: number;
  status: 'Available' | 'InUse' | 'Maintenance' | 'Missing';
  lastMaintenance?: string;
}

// Rental Types
export interface Rental {
  id: string;
  userId: string;
  bikeId: string;
  stationId: string;
  startTime: string;
  endTime?: string;
  pricingPlan: PricingPlan;
  costBreakdown: CostBreakdown;
  status: 'Pending' | 'Active' | 'Completed' | 'Disputed';
  distance?: number;
}

export interface PricingPlan {
  type: 'minute' | 'hour' | 'day';
  duration: number;
  basePrice: number;
  description: string;
}

export interface CostBreakdown {
  basePrice: number;
  servicePrice: number;
  tax: number;
  discount: number;
  total: number;
}

// Wallet Types
export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'rental' | 'adjust';
  amount: number;
  status: 'Initiated' | 'Processing' | 'Success' | 'Failed';
  createdAt: string;
  description?: string;
}

// Points Types
export interface PointsTransaction {
  id: string;
  userId: string;
  source: 'rental' | 'referral' | 'redeem' | 'bonus';
  points: number;
  createdAt: string;
  description: string;
}

export interface RewardReceipt {
  id: string;
  userId: string;
  rewardType: string;
  pointsSpent: number;
  benefitDetail: string;
  status: 'Available' | 'Redeemed' | 'Expired';
  createdAt: string;
  expiresAt?: string;
}

// Referral Types
export interface ReferralRecord {
  id: string;
  inviterUserId: string;
  invitedUserId: string;
  status: 'PendingFirstRental' | 'Completed';
  createdAt: string;
  completedAt?: string;
  pointsAwarded?: number;
}

// Support Types
export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'Open' | 'In-Review' | 'Resolved' | 'Closed';
  category: 'technical' | 'billing' | 'safety' | 'other';
  createdAt: string;
  updates: SupportUpdate[];
}

export interface SupportUpdate {
  id: string;
  ticketId: string;
  message: string;
  author: 'user' | 'support';
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId?: string; // null for system-wide notifications
  title: string;
  body: string;
  category: 'rental' | 'payment' | 'system' | 'promotion';
  readStatus: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Admin Analytics Types
export interface AnalyticsData {
  rentalsToday: number;
  rentalsThisWeek: number;
  revenueToday: number;
  revenueThisWeek: number;
  lowBatteryBikes: number;
  lowBatteryPercentage: number;
  activeUsers: number;
  averageRentalDuration: number;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  identifier: string; // phone or cccd
  password: string;
}

export interface RegisterForm {
  name: string;
  phone: string;
  cccd: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
}

export interface ForgotPasswordForm {
  phone: string;
}

export interface ResetPasswordForm {
  phone: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
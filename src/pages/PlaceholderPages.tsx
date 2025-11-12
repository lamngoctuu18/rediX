// Tạo các placeholder pages để tránh lỗi routing
import React from 'react';
import { Button } from '../components/atoms';
import { Card } from '../components/molecules';

const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="space-y-6">
    <h1 className="text-h1-lg text-primary font-semibold">{title}</h1>
    
    <Card>
      <div className="text-center space-y-4 py-8">
        <div className="w-16 h-16 bg-primary-16 rounded-full flex items-center justify-center mx-auto">
          <span className="text-h2 text-primary">🚧</span>
        </div>
        <h2 className="text-h2 text-primary font-semibold">Đang phát triển</h2>
        <p className="text-body text-text-secondary">{description}</p>
        <Button variant="secondary" onClick={() => window.history.back()}>
          Quay lại
        </Button>
      </div>
    </Card>
  </div>
);

export const RentActivePage = () => <PlaceholderPage title="Chuyến đang thuê" description="Tính năng theo dõi chuyến đi đang được phát triển" />;
export const RentSummaryPage = () => <PlaceholderPage title="Tóm tắt chuyến đi" description="Tính năng tóm tắt chuyến đi đang được phát triển" />;
export const WalletPage = () => <PlaceholderPage title="Ví tiền" description="Tính năng quản lý ví tiền đang được phát triển" />;
export const PointsPage = () => <PlaceholderPage title="Điểm thưởng" description="Tính năng điểm thưởng đang được phát triển" />;
export const ReferralPage = () => <PlaceholderPage title="Giới thiệu bạn bè" description="Tính năng giới thiệu bạn bè đang được phát triển" />;
export const ProfilePage = () => <PlaceholderPage title="Hồ sơ cá nhân" description="Tính năng hồ sơ cá nhân đang được phát triển" />;
export const SupportPage = () => <PlaceholderPage title="Hỗ trợ khách hàng" description="Tính năng hỗ trợ khách hàng đang được phát triển" />;

// Admin pages
export const AdminStationsPage = () => <PlaceholderPage title="Quản lý trạm xe" description="Tính năng quản lý trạm xe đang được phát triển" />;
export const AdminBikesPage = () => <PlaceholderPage title="Quản lý xe đạp" description="Tính năng quản lý xe đạp đang được phát triển" />;
export const AdminRentalsPage = () => <PlaceholderPage title="Quản lý thuê xe" description="Tính năng quản lý thuê xe đang được phát triển" />;
export const AdminAnalyticsPage = () => <PlaceholderPage title="Thống kê & Phân tích" description="Tính năng thống kê & phân tích đang được phát triển" />;
export const AdminSupportPage = () => <PlaceholderPage title="Hỗ trợ khách hàng (Admin)" description="Tính năng quản lý hỗ trợ khách hàng đang được phát triển" />;
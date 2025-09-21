import React from 'react';
import StatsCards from './StatsCards';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const DashboardContent = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.user_metadata?.name}!
        </h2>
        <p className="text-gray-600">Here's how your craft is performing today.</p>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardContent;
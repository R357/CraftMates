import React from 'react';
import { Eye, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Views',
      value: '12,340',
      change: '+12% from last week',
      icon: Eye,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Followers',
      value: '1,250',
      change: '+8% from last week',
      icon: Users,
      iconColor: 'text-purple-500'
    },
    {
      title: 'Products Sold',
      value: '28',
      change: '+15% from last week',
      icon: ShoppingBag,
      iconColor: 'text-green-500'
    },
    {
      title: 'Revenue',
      value: '₹45,600',
      change: '+22% from last week',
      icon: TrendingUp,
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
          </div>
          <p className="text-sm text-green-600 mt-2">{stat.change}</p>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
import React from 'react';
import { Heart, MessageCircle, Users } from 'lucide-react';
import Card from '../ui/Card';

const RecentActivity = () => {
  const activities = [
    {
      title: 'New like on Terracotta Vase',
      time: '2 hours ago',
      icon: Heart,
      iconColor: 'text-red-500'
    },
    {
      title: 'Customer inquiry received',
      time: '4 hours ago',
      icon: MessageCircle,
      iconColor: 'text-blue-500'
    },
    {
      title: '5 new followers',
      time: '1 day ago',
      icon: Users,
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
            <div>
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;
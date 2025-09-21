import React from 'react';
import { Plus, Edit3, Camera, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Product',
      icon: Plus,
      gradient: 'from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Update Story',
      icon: Edit3,
      gradient: 'from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Generate AI Photos',
      icon: Camera,
      gradient: 'from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 p-4 bg-gradient-to-r ${action.gradient} rounded-lg transition-colors`}
          >
            <action.icon className={`w-5 h-5 ${action.iconColor}`} />
            <span className="font-medium text-gray-900">{action.title}</span>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
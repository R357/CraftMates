import React from 'react';
import { Award, User, LogOut } from 'lucide-react';

const Header = ({ user, currentView, onViewChange, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'ai-tools', label: 'AI Tools' }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-10 h-10 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              CraftStory
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    currentView === item.id 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 bg-gray-200 rounded-full p-2" />
                <span className="text-sm font-medium">{user?.user_metadata?.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
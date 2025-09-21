import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Header from './components/layout/Header';
import DashboardContent from './components/dashboard/DashboardContent';
import MarketplaceContent from './components/marketplace/MarketplaceContent';
import AIToolsContent from './components/ai-tools/AIToolsContent';

const CraftStoryApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const { user, login, signup, logout, loading, error } = useAuth();

  // 🔑 Whenever a user logs in, redirect them to dashboard by default
  useEffect(() => {
    if (user) {
      setCurrentView('dashboard');
    }
  }, [user]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  if (currentView === 'login' && !user) {
    return (
      <LoginForm
        onLogin={login}
        onSwitchToSignup={() => setCurrentView('signup')}
        loading={loading}
        error={error}
      />
    );
  }

  if (currentView === 'signup' && !user) {
    return (
      <SignupForm
        onSignup={signup}
        onSwitchToLogin={() => setCurrentView('login')}
        loading={loading}
        error={error}
      />
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          currentView={currentView}
          onViewChange={handleViewChange}
          onLogout={logout}
        />

        {currentView === 'dashboard' && <DashboardContent user={user} />}
        {currentView === 'marketplace' && <MarketplaceContent />}
        {currentView === 'ai-tools' && <AIToolsContent />}
      </div>
    );
  }

  return (
    <LoginForm
      onLogin={login}
      onSwitchToSignup={() => setCurrentView('signup')}
      loading={loading}
      error={error}
    />
  );
};

export default CraftStoryApp;

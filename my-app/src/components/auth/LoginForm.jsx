import React, { useState } from 'react';
import { Award } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm = ({ onLogin, onSwitchToSignup, loading, error }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData.email, loginData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            CraftStory
          </h1>
          <p className="text-gray-600 mt-2">Empowering Artisans with AI</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            placeholder="artisan@demo.com"
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            placeholder="demo123"
            required
          />
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            variant="primary"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-orange-600 font-semibold hover:text-orange-700"
            >
              Sign Up
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">Email: artisan@demo.com</p>
          <p className="text-sm text-blue-700">Password: demo123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
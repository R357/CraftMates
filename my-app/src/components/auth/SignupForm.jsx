import React, { useState } from 'react';
import { Award } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SignupForm = ({ onSignup, onSwitchToLogin, loading, error }) => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: '',
    craft: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, ...metadata } = signupData;
    onSignup(email, password, metadata);
  };

  const handleChange = (field, value) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Join CraftStory
          </h1>
          <p className="text-gray-600 mt-2">Share your craft with the world</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={signupData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your full name"
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={signupData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your@email.com"
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={signupData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Choose a password"
            required
          />
          
          <Input
            label="Craft Specialization"
            type="text"
            value={signupData.craft}
            onChange={(e) => handleChange('craft', e.target.value)}
            placeholder="e.g., Pottery, Textile, Jewelry"
            required
          />
          
          <Input
            label="Location"
            type="text"
            value={signupData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State"
            required
          />
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            variant="primary"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-orange-600 font-semibold hover:text-orange-700"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
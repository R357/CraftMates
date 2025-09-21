import React from 'react';
import { Edit3, Camera, TrendingUp, Share2, Globe } from 'lucide-react';
import ToolCard from './ToolCard';

const AIToolsContent = () => {
  const tools = [
    {
      title: 'AI Story Generator',
      description: 'Generate compelling narratives about your craft, heritage, and creative process using AI.',
      icon: Edit3,
      gradient: 'from-purple-500 to-pink-500',
      hoverGradient: 'from-purple-600 to-pink-600',
      buttonText: 'Generate Story'
    },
    {
      title: 'Smart Photo Enhancement',
      description: 'Enhance your product photos with AI-powered editing and professional styling suggestions.',
      icon: Camera,
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600',
      buttonText: 'Enhance Photos'
    },
    {
      title: 'Market Trend Analysis',
      description: 'Get insights on market trends, pricing recommendations, and consumer preferences.',
      icon: TrendingUp,
      gradient: 'from-green-500 to-teal-500',
      hoverGradient: 'from-green-600 to-teal-600',
      buttonText: 'Analyze Market'
    },
    {
      title: 'Social Media Generator',
      description: 'Create engaging social media posts and captions tailored to your craft and audience.',
      icon: Share2,
      gradient: 'from-orange-500 to-red-500',
      hoverGradient: 'from-orange-600 to-red-600',
      buttonText: 'Generate Content'
    },
    {
      title: 'Multi-language Support',
      description: 'Translate your product descriptions and stories into multiple languages for global reach.',
      icon: Globe,
      gradient: 'from-indigo-500 to-purple-500',
      hoverGradient: 'from-indigo-600 to-purple-600',
      buttonText: 'Translate Content'
    },
    {
      title: 'Smart Pricing',
      description: 'Get AI-powered pricing recommendations based on market data and product characteristics.',
      icon: TrendingUp,
      gradient: 'from-yellow-500 to-orange-500',
      hoverGradient: 'from-yellow-600 to-orange-600',
      buttonText: 'Optimize Pricing'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Tools</h2>
        <p className="text-gray-600">Enhance your craft marketing with artificial intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Craft Workshop</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our interactive AI workshop to learn how to leverage artificial intelligence 
            for better storytelling, marketing, and customer engagement.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
            Join Workshop
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIToolsContent;
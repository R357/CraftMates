import React from 'react';
import { Star, Map } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ArtisanCard = ({ artisan }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img src={artisan.image} alt={artisan.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl font-semibold">{artisan.name}</h4>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{artisan.rating}</span>
          </div>
        </div>
        <p className="text-orange-600 font-medium mb-2">{artisan.craft}</p>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <Map className="w-4 h-4 mr-1" />
          {artisan.location}
        </p>
        <p className="text-gray-700 text-sm mb-4">{artisan.story}</p>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>{artisan.followers} followers</span>
          <span>{artisan.products} products</span>
        </div>
        <Button className="w-full" variant="primary">
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default ArtisanCard;
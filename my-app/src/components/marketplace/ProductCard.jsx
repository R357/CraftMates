import React from 'react';
import { Heart, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="font-semibold mb-2">{product.name}</h4>
        <p className="text-sm text-gray-600 mb-2">by {product.artisan}</p>
        <p className="text-xl font-bold text-orange-600 mb-3">₹{product.price.toLocaleString()}</p>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {product.likes}
          </span>
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {product.views}
          </span>
        </div>
        <Button className="w-full" variant="primary">
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
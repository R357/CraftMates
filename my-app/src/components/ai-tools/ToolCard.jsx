import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ToolCard = ({ tool }) => {
  return (
    <Card className="p-6 border-2 border-transparent hover:border-opacity-30 transition-colors">
      <div className={`bg-gradient-to-r ${tool.gradient} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
        <tool.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      <Button 
        className="w-full"
        style={{
          background: `linear-gradient(to right, ${tool.gradient.split(' ')[1]}, ${tool.gradient.split(' ')[3]})`,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = `linear-gradient(to right, ${tool.hoverGradient.split(' ')[1]}, ${tool.hoverGradient.split(' ')[3]})`;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = `linear-gradient(to right, ${tool.gradient.split(' ')[1]}, ${tool.gradient.split(' ')[3]})`;
        }}
      >
        {tool.buttonText}
      </Button>
    </Card>
  );
};

export default ToolCard;
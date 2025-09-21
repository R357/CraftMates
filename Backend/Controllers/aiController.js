const axios = require('axios');

// Mock AI responses for demo purposes
const mockAIResponses = {
  story: [
    "As a third-generation artisan, my craft carries the whispers of ancient traditions passed down through weathered hands and patient hearts. Each piece I create is not just an object, but a vessel carrying stories of my ancestors, their dreams woven into every curve and texture.",
    "My journey began in childhood, watching my grandmother's skilled fingers dance across clay, transforming earth into beauty. Today, I blend those time-honored techniques with contemporary vision, creating pieces that honor the past while embracing the future.",
    "In my workshop, surrounded by tools that have shaped countless dreams, I find meditation in the rhythm of creation. Each stroke, each careful detail, represents not just artistic expression, but a bridge between generations of craftspeople who believed in the power of handmade beauty."
  ],
  socialMedia: [
    "🎨 Every piece tells a story. What story will yours tell? ✨ #HandmadeCrafts #ArtisanLife #CraftStory",
    "From raw materials to finished masterpiece - witness the magic of traditional craftsmanship! 🙌 #ProcessVideo #Handmade #CraftingMagic",
    "Behind every handcrafted piece is hours of dedication, years of learning, and generations of wisdom. 💫 #ArtisanStory #HandmadeWithLove"
  ],
  pricing: {
    pottery: { min: 800, max: 5000, suggested: 2500 },
    textile: { min: 2000, max: 25000, suggested: 8500 },
    jewelry: { min: 1500, max: 15000, suggested: 4500 },
    woodwork: { min: 1200, max: 8000, suggested: 3200 }
  }
};

const generateStory = async (req, res) => {
  try {
    const { craft, experience, heritage, style } = req.body;
    
    // In a real implementation, this would call OpenAI API
    // For demo purposes, we'll return a mock response
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    const stories = mockAIResponses.story;
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    
    // Customize story based on input
    let customizedStory = randomStory;
    if (craft) {
      customizedStory = customizedStory.replace('craft', craft.toLowerCase());
    }
    
    res.json({
      success: true,
      data: {
        story: customizedStory,
        suggestions: [
          "Consider adding more personal details about your journey",
          "Mention specific techniques that make your work unique",
          "Include the cultural significance of your craft"
        ]
      }
    });
  } catch (error) {
    console.error('Generate story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate story'
    });
  }
};

const generateSocialMedia = async (req, res) => {
  try {
    const { productName, craft, tone = 'inspiring' } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const posts = mockAIResponses.socialMedia;
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    
    res.json({
      success: true,
      data: {
        posts: [
          randomPost,
          ✨ Introducing our latest creation: ${productName || 'handcrafted masterpiece'}! Made with love and traditional techniques. 🎨 #NewProduct #${craft || 'Handmade'},
          The beauty of ${craft || 'handcrafted'} work lies in its imperfections - each unique mark tells a story of human touch. 💫 #AuthenticCraft #HandmadeBeauty
        ],
        hashtags: [
          '#HandmadeCrafts',
          '#ArtisanMade',
          '#CraftStory',
          '#SupportLocal',
          '#TraditionalCrafts',
          #${craft || 'Handmade'},
          '#UniqueDesign',
          '#CraftedWithLove'
        ]
      }
    });
  } catch (error) {
    console.error('Generate social media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate social media content'
    });
  }
};

const analyzePricing = async (req, res) => {
  try {
    const { craft, materials, timeSpent, complexity, location } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulate API delay
    
    const craftLower = craft?.toLowerCase() || 'general';
    const pricingData = mockAIResponses.pricing[craftLower] || mockAIResponses.pricing.pottery;
    
    // Calculate suggested price based on inputs
    let basePrice = pricingData.suggested;
    
    if (timeSpent) {
      basePrice += timeSpent * 50; // ₹50 per hour
    }
    
    if (complexity === 'high') {
      basePrice *= 1.3;
    } else if (complexity === 'low') {
      basePrice *= 0.8;
    }
    
    // Location adjustment (mock)
    if (location?.toLowerCase().includes('mumbai') || location?.toLowerCase().includes('delhi')) {
      basePrice *= 1.2;
    }
    
    const suggestedPrice = Math.round(basePrice);
    
    res.json({
      success: true,
      data: {
        suggestedPrice,
        priceRange: {
          min: Math.round(suggestedPrice * 0.8),
          max: Math.round(suggestedPrice * 1.4)
        },
        factors: [
          { factor: 'Craft Type', impact: 'Medium', description: ${craft} has moderate market demand },
          { factor: 'Time Investment', impact: 'High', description: ${timeSpent || 10} hours of work significantly impacts value },
          { factor: 'Complexity', impact: complexity === 'high' ? 'High' : 'Medium', description: ${complexity || 'Medium'} complexity affects pricing },
          { factor: 'Location', impact: 'Low', description: 'Regional market conditions considered' }
        ],
        recommendations: [
          'Consider offering different size/complexity variants',
          'Bundle products for higher value sales',
          'Highlight unique techniques in product descriptions',
          'Monitor competitor pricing regularly'
        ]
      }
    });
  } catch (error) {
    console.error('Analyze pricing error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze pricing'
    });
  }
};

const enhancePhotos = async (req, res) => {
  try {
    const { imageUrl, enhancementType = 'general' } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing delay
    
    // In a real implementation, this would process the image
    // For demo purposes, we'll return enhancement suggestions
    
    res.json({
      success: true,
      data: {
        enhancedImageUrl: imageUrl, // In real implementation, this would be the enhanced image
        suggestions: [
          'Increase brightness by 15% for better product visibility',
          'Adjust contrast to highlight texture details',
          'Consider using natural lighting for warmer tones',
          'Crop to focus on the main product features',
          'Add a subtle background blur to make product stand out'
        ],
        technicalAnalysis: {
          brightness: 'Slightly underexposed',
          contrast: 'Good',
          sharpness: 'Excellent',
          composition: 'Well-centered',
          colorBalance: 'Warm tones recommended'
        }
      }
    });
  } catch (error) {
    console.error('Enhance photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance photos'
    });
  }
};

const translateContent = async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = 'en' } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // Mock translations for demo
    const mockTranslations = {
      'hi': 'यह एक सुंदर हस्तशिल्प उत्पाद है जो पारंपरिक तकनीकों से बनाया गया है।',
      'es': 'Este es un hermoso producto artesanal hecho con técnicas tradicionales.',
      'fr': 'Il s\'agit d\'un beau produit artisanal fabriqué avec des techniques traditionnelles.',
      'de': 'Dies ist ein wunderschönes handwerkliches Produkt, das mit traditionellen Techniken hergestellt wurde.',
      'ja': 'これは伝統的な技法で作られた美しい手工芸品です。'
    };
    
    const translatedText = mockTranslations[targetLanguage] || text;
    
    res.json({
      success: true,
      data: {
        translatedText,
        sourceLanguage,
        targetLanguage,
        confidence: 0.95,
        alternatives: [
          translatedText,
          translatedText.replace('सुंदर', 'अद्भुत'), // Example alternative for Hindi
          translatedText.replace('पारंपरिक', 'प्राचीन') // Another alternative
        ].slice(0, targetLanguage === 'hi' ? 3 : 1)
      }
    });
  } catch (error) {
    console.error('Translate content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to translate content'
    });
  }
};

const getMarketTrends = async (req, res) => {
  try {
    const { craft, region = 'India' } = req.query;
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    // Mock market data
    const trendData = {
      craft: craft || 'General Crafts',
      region,
      trends: [
        {
          category: 'Demand',
          trend: 'Increasing',
          percentage: 23,
          description: 'Growing interest in handmade products'
        },
        {
          category: 'Price Range',
          trend: 'Stable',
          percentage: 5,
          description: 'Prices have remained consistent with slight upward trend'
        },
        {
          category: 'Competition',
          trend: 'Moderate',
          percentage: 15,
          description: 'Healthy competition with room for new artisans'
        }
      ],
      popularProducts: [
        'Home Decor Items',
        'Jewelry & Accessories',
        'Textile Products',
        'Pottery & Ceramics'
      ],
      seasonalInsights: [
        'Festival seasons show 40% increase in demand',
        'Wedding season drives jewelry and textile sales',
        'Summer months favor lighter, decorative items'
      ],
      recommendations: [
        'Focus on eco-friendly materials for better market appeal',
        'Consider online marketplaces for wider reach',
        'Develop signature styles to stand out from competition',
        'Collaborate with interior designers for bulk orders'
      ]
    };
    
    res.json({
      success: true,
      data: trendData
    });
  } catch (error) {
    console.error('Get market trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch market trends'
    });
  }
};

module.exports = {
  generateStory,
  generateSocialMedia,
  analyzePricing,
  enhancePhotos,
  translateContent,
  getMarketTrends
};
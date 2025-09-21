const supabase = require('../config/database');

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's products count
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'active');

    // Get total views for user's products
    const { data: viewsData } = await supabase
      .from('product_stats')
      .select('views')
      .in('product_id', 
        supabase
          .from('products')
          .select('id')
          .eq('user_id', userId)
          .eq('status', 'active')
      );

    const totalViews = viewsData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;

    // Get total likes for user's products
    const { data: likesData } = await supabase
      .from('product_stats')
      .select('likes')
      .in('product_id', 
        supabase
          .from('products')
          .select('id')
          .eq('user_id', userId)
          .eq('status', 'active')
      );

    const totalLikes = likesData?.reduce((sum, item) => sum + (item.likes || 0), 0) || 0;

    // Get followers count
    const { count: followersCount } = await supabase
      .from('user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', userId);

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from('user_activity')
      .select(`
        *,
        products (name),
        users (name)
      `)
      .eq('target_user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate revenue (mock calculation)
    const { data: products } = await supabase
      .from('products')
      .select('price')
      .eq('user_id', userId)
      .eq('status', 'active');

    const estimatedRevenue = products?.reduce((sum, product) => {
      // Mock: assume 10% of views convert to sales
      const estimatedSales = Math.floor((totalViews * 0.1) / (products.length || 1));
      return sum + (product.price * estimatedSales);
    }, 0) || 0;

    // Get weekly comparison data (mock)
    const weeklyStats = {
      views: { current: totalViews, previous: Math.floor(totalViews * 0.88), change: 12 },
      followers: { current: followersCount || 0, previous: Math.floor((followersCount || 0) * 0.92), change: 8 },
      products: { current: productsCount || 0, previous: Math.max(0, (productsCount || 0) - 2), change: 15 },
      revenue: { current: estimatedRevenue, previous: Math.floor(estimatedRevenue * 0.78), change: 22 }
    };

    res.json({
      success: true,
      data: {
        stats: {
          totalViews,
          totalLikes,
          followersCount: followersCount || 0,
          productsCount: productsCount || 0,
          estimatedRevenue
        },
        weeklyComparison: weeklyStats,
        recentActivity: recentActivity || [],
        quickActions: [
          { id: 'add-product', label: 'Add New Product', icon: 'plus' },
          { id: 'update-story', label: 'Update Story', icon: 'edit' },
          { id: 'generate-photos', label: 'Generate AI Photos', icon: 'camera' }
        ]
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '7d' } = req.query;

    // Mock analytics data for demo
    const analyticsData = {
      period,
      viewsOverTime: [
        { date: '2024-01-01', views: 120 },
        { date: '2024-01-02', views: 150 },
        { date: '2024-01-03', views: 180 },
        { date: '2024-01-04', views: 200 },
        { date: '2024-01-05', views: 175 },
        { date: '2024-01-06', views: 220 },
        { date: '2024-01-07', views: 250 }
      ],
      topProducts: [
        { name: 'Handcrafted Terracotta Vase', views: 450, likes: 23 },
        { name: 'Traditional Pottery Set', views: 320, likes: 18 },
        { name: 'Decorative Clay Bowls', views: 280, likes: 15 }
      ],
      audienceInsights: {
        demographics: {
          age: { '18-25': 15, '26-35': 35, '36-45': 30, '46-55': 15, '55+': 5 },
          location: { 'Mumbai': 25, 'Delhi': 20, 'Bangalore': 15, 'Chennai': 12, 'Others': 28 }
        },
        interests: ['Home Decor', 'Traditional Crafts', 'Handmade Items', 'Art Collection']
      },
      engagement: {
        likesRate: 8.5,
        sharesRate: 3.2,
        commentsRate: 5.1,
        followRate: 2.8
      }
    };

    res.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics data'
    });
  }
};

module.exports = {
  getDashboardStats,
  getAnalytics
};
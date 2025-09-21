const supabase = require('../config/database');

const getArtisans = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      craft, 
      location, 
      search,
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('users')
      .select(`
        id,
        name,
        craft,
        location,
        bio,
        profile_image,
        created_at,
        user_stats (
          followers,
          following,
          total_products,
          total_views,
          total_likes
        )
      `, { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order(sort, { ascending: order === 'asc' });

    if (craft) {
      query = query.ilike('craft', %${craft}%);
    }

    if (location) {
      query = query.ilike('location', %${location}%);
    }

    if (search) {
      query = query.or(name.ilike.%${search}%,craft.ilike.%${search}%,location.ilike.%${search}%);
    }

    const { data: artisans, error, count } = await query;

    if (error) {
      console.error('Get artisans error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch artisans'
      });
    }

    res.json({
      success: true,
      data: {
        artisans,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get artisans error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getArtisan = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: artisan, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        craft,
        location,
        bio,
        profile_image,
        created_at,
        user_stats (
          followers,
          following,
          total_products,
          total_views,
          total_likes
        )
      `)
      .eq('id', id)
      .single();

    if (error || !artisan) {
      return res.status(404).json({
        success: false,
        message: 'Artisan not found'
      });
    }

    // Get artisan's products
    const { data: products } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        category,
        images,
        created_at,
        product_stats (
          views,
          likes,
          shares
        )
      `)
      .eq('user_id', id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6);

    res.json({
      success: true,
      data: {
        artisan: {
          ...artisan,
          products: products || []
        }
      }
    });
  } catch (error) {
    console.error('Get artisan error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const followArtisan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (id === userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot follow yourself'
      });
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('user_follows')
      .select('id')
      .eq('follower_id', userId)
      .eq('following_id', id)
      .single();

    if (existingFollow) {
      // Unfollow
      await supabase
        .from('user_follows')
        .delete()
        .eq('follower_id', userId)
        .eq('following_id', id);

      // Update stats
      await supabase.rpc('decrement_user_followers', { user_id: id });
      await supabase.rpc('decrement_user_following', { user_id: userId });

      res.json({
        success: true,
        message: 'Unfollowed artisan',
        data: { following: false }
      });
    } else {
      // Follow
      await supabase
        .from('user_follows')
        .insert([{
          follower_id: userId,
          following_id: id,
          created_at: new Date().toISOString()
        }]);

      // Update stats
      await supabase.rpc('increment_user_followers', { user_id: id });
      await supabase.rpc('increment_user_following', { user_id: userId });

      res.json({
        success: true,
        message: 'Following artisan',
        data: { following: true }
      });
    }
  } catch (error) {
    console.error('Follow artisan error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: followers, error, count } = await supabase
      .from('user_follows')
      .select(`
        follower:users!follower_id (
          id,
          name,
          craft,
          location,
          profile_image
        )
      `, { count: 'exact' })
      .eq('following_id', id)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get followers error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch followers'
      });
    }

    res.json({
      success: true,
      data: {
        followers: followers.map(f => f.follower),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: following, error, count } = await supabase
      .from('user_follows')
      .select(`
        following:users!following_id (
          id,
          name,
          craft,
          location,
          profile_image
        )
      `, { count: 'exact' })
      .eq('follower_id', id)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get following error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch following'
      });
    }

    res.json({
      success: true,
      data: {
        following: following.map(f => f.following),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getArtisans,
  getArtisan,
  followArtisan,
  getFollowers,
  getFollowing
};
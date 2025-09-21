const { v4: uuidv4 } = require('uuid');
const supabase = require('../config/database');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, tags } = req.body;
    const userId = req.user.id;

    const productId = uuidv4();
    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        id: productId,
        user_id: userId,
        name,
        description,
        price: parseFloat(price),
        category,
        tags: tags || [],
        status: 'active',
        created_at: new Date().toISOString()
      }])
      .select(`
        *,
        users (
          id,
          name,
          craft,
          location
        )
      `)
      .single();

    if (error) {
      console.error('Create product error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create product'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      search, 
      sort = 'created_at',
      order = 'desc',
      user_id 
    } = req.query;

    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('products')
      .select(`
        *,
        users (
          id,
          name,
          craft,
          location
        ),
        product_stats (
          views,
          likes,
          shares
        )
      `, { count: 'exact' })
      .eq('status', 'active')
      .range(offset, offset + limit - 1)
      .order(sort, { ascending: order === 'asc' });

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(name.ilike.%${search}%,description.ilike.%${search}%);
    }

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data: products, error, count } = await query;

    if (error) {
      console.error('Get products error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products'
      });
    }

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        users (
          id,
          name,
          craft,
          location,
          bio
        ),
        product_stats (
          views,
          likes,
          shares
        )
      `)
      .eq('id', id)
      .eq('status', 'active')
      .single();

    if (error || !product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count
    await supabase.rpc('increment_product_views', { product_id: id });

    res.json({
      success: true,
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, tags } = req.body;
    const userId = req.user.id;

    // Check if product belongs to user
    const { data: existingProduct } = await supabase
      .from('products')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingProduct || existingProduct.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price: parseFloat(price),
        category,
        tags: tags || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        users (
          id,
          name,
          craft,
          location
        )
      `)
      .single();

    if (error) {
      console.error('Update product error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update product'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if product belongs to user
    const { data: existingProduct } = await supabase
      .from('products')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingProduct || existingProduct.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    const { error } = await supabase
      .from('products')
      .update({ 
        status: 'deleted',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Delete product error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete product'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const likeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('product_likes')
      .select('id')
      .eq('product_id', id)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('product_likes')
        .delete()
        .eq('product_id', id)
        .eq('user_id', userId);

      await supabase.rpc('decrement_product_likes', { product_id: id });

      res.json({
        success: true,
        message: 'Product unliked',
        data: { liked: false }
      });
    } else {
      // Like
      await supabase
        .from('product_likes')
        .insert([{
          product_id: id,
          user_id: userId,
          created_at: new Date().toISOString()
        }]);

      await supabase.rpc('increment_product_likes', { product_id: id });

      res.json({
        success: true,
        message: 'Product liked',
        data: { liked: true }
      });
    }
  } catch (error) {
    console.error('Like product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  likeProduct
};
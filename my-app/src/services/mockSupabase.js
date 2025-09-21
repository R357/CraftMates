export const mockSupabase = {
  auth: {
    signIn: async (email, password) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === 'artisan@demo.com' && password === 'demo123') {
        return { 
          user: { 
            id: '1', 
            email, 
            user_metadata: { 
              name: 'Ravi Kumar', 
              craft: 'Pottery', 
              location: 'Jaipur, Rajasthan' 
            } 
          }, 
          error: null 
        };
      }
      return { user: null, error: { message: 'Invalid credentials' } };
    },
    
    signUp: async (email, password, metadata) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        user: { 
          id: Date.now().toString(), 
          email, 
          user_metadata: metadata 
        }, 
        error: null 
      };
    },
    
    signOut: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null };
    }
  }
};
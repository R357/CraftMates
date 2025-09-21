import { useState } from 'react';
import { mockSupabase } from '../services/mockSupabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const { user, error } = await mockSupabase.auth.signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        setUser(user);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, metadata) => {
    setLoading(true);
    setError('');
    
    try {
      const { user, error } = await mockSupabase.auth.signUp(email, password, metadata);
      if (error) {
        setError(error.message);
      } else {
        setUser(user);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await mockSupabase.auth.signOut();
    setUser(null);
    setError('');
  };

  return {
    user,
    login,
    signup,
    logout,
    loading,
    error
  };
};
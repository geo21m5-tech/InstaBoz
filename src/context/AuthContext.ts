import React, { createContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  username: string;
  email: string;
  paypalEmail: string;
  avatar?: string;
  createdAt: number;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, paypalEmail: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const mockUser: User = {
        id: 'user_' + Date.now(),
        username: email.split('@')[0],
        email,
        paypalEmail: email,
        createdAt: Date.now(),
      };
      setUser(mockUser);
      await AsyncStorage.setItem('bozvid_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      paypalEmail: string
    ) => {
      setIsLoading(true);
      try {
        const newUser: User = {
          id: 'user_' + Date.now(),
          username,
          email,
          paypalEmail,
          createdAt: Date.now(),
        };
        setUser(newUser);
        await AsyncStorage.setItem('bozvid_user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('bozvid_user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem('bozvid_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

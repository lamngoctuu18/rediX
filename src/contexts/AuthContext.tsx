import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for stored auth token on app startup
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, validate token with backend
          // For now, we'll use mock data
          const mockUser: User = {
            id: '1',
            segment: 'student',
            profile: {
              name: 'Nguyễn Văn A',
              phone: '0123456789',
              email: 'user@example.com',
              cccd: '123456789012',
              dateOfBirth: '1999-01-01'
            },
            walletBalance: 50000,
            points: 120,
            status: 'Active'
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock login - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Mock success for demo
      if (identifier && password) {
        const mockUser: User = {
          id: '1',
          segment: identifier.includes('admin') ? 'admin' : 'student',
          profile: {
            name: identifier.includes('admin') ? 'Admin User' : 'Nguyễn Văn A',
            phone: '0123456789',
            email: 'user@example.com',
            cccd: '123456789012',
            dateOfBirth: '1999-01-01'
          },
          walletBalance: 50000,
          points: 120,
          status: 'Active'
        };
        
        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock registration - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const newUser: User = {
        id: Date.now().toString(),
        segment: 'student',
        profile: {
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          cccd: userData.cccd,
          dateOfBirth: userData.dateOfBirth
        },
        walletBalance: 0,
        points: 0,
        status: 'Active'
      };
      
      setUser(newUser);
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuthState({
        user: JSON.parse(user),
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Create a partial user for demo
      const userData = {
        id: '1',
        email,
        name: 'Demo User',
        age: 0,
        careerStage: 'student_undergraduate' as const,
        careerPath: 'software_engineer' as const,
        tools: [],
        developmentLanguages: [],
        skillLevels: {
          problemSolving: 0,
          communication: 0,
          technicalSkills: 0,
          leadership: 0,
          adaptability: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed'
      }));
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const userData = {
        id: '1',
        email,
        name,
        age: 0,
        careerStage: 'student_undergraduate' as const,
        careerPath: 'software_engineer' as const,
        tools: [],
        developmentLanguages: [],
        skillLevels: {
          problemSolving: 0,
          communication: 0,
          technicalSkills: 0,
          leadership: 0,
          adaptability: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Signup failed'
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
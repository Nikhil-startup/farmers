'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/farmer';
import { apiClient } from '@/lib/apiClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<boolean>;
  register: (data: Partial<User> & { password?: string }) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('agriflow_auth_token') : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const currentUser = await apiClient<User>('/api/auth/me', { method: 'GET' });
      setUser(currentUser);
    } catch {
      // If token is invalid or backend unreachable, clear stored token
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (identifier: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await apiClient<{ token: string; user: User }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password: pass }),
      });

      if (res?.token && res?.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('agriflow_auth_token', res.token);
        }
        setUser(res.user);
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (data: Partial<User> & { password?: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await apiClient<{ token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (res?.token && res?.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('agriflow_auth_token', res.token);
        }
        setUser(res.user);
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agriflow_auth_token');
    }
    setUser(null);
    router.push('/farmer');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
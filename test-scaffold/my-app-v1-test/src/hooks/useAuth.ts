'use client';

import { useEffect } from 'react';

import { logout } from '@/features/auth/services/auth-service';
import { useAuthStore } from '@/store';

export function useAuth() {
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('session_token');

    if (storedUser && token && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser, user]);

  const signOut = () => {
    logout();
    clearUser();
  };

  return { user, isAuthenticated, signOut, setUser };
}

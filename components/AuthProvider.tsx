'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/app/config/firebase';

interface UserContextType {
  user: User | null;
}

export const AuthContext = createContext<UserContextType>({ user: null });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authedUser, setAuthedUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthedUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: authedUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
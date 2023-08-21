'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  IdTokenResult,
  onIdTokenChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Claims, filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims';

type User = {
  uid : string,
  email : string | null,
  photoURL : string | null,
  phoneNumber: string | null,
  displayName: string | null,
  customClaims: Claims
}
export interface AuthProviderProps {
  defaultUser: User | null;
  children: React.ReactNode;
}

interface UserContextType {
  user: User | null;
}

export const AuthContext = createContext<UserContextType>({ user: null });

function toUser(user: FirebaseUser, idTokenResult: IdTokenResult): User {
  return {
    ...user,
    customClaims: filterStandardClaims(idTokenResult.claims),
  };
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultUser,
  children,
}) => {
  const firebaseAuth = auth;
  const [user, setUser] = React.useState(defaultUser);

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      setUser(null);
      return;
    }

    const idTokenResult = await firebaseUser.getIdTokenResult();
    // console.log(idTokenResult);
    setUser(toUser(firebaseUser, idTokenResult));
  };

  const registerChangeListener = async () => {
    const auth = firebaseAuth;
    return onIdTokenChanged(auth, handleIdTokenChanged);
  };

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();

    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
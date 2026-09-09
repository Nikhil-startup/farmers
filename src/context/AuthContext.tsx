'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/farmer';
import { auth, db } from '@/lib/firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setupRecaptcha: (containerId: string) => RecaptchaVerifier;
  sendPhoneOtp: (phoneNumber: string, containerId?: string) => Promise<ConfirmationResult>;
  verifyPhoneOtp: (
    confirmationResult: ConfirmationResult,
    otp: string,
    role?: 'farmer' | 'consumer' | 'logistics' | 'fpo',
    details?: Partial<User>
  ) => Promise<User>;
  loginWithGoogle: (role?: 'farmer' | 'consumer' | 'logistics' | 'fpo') => Promise<User>;
  loginWithDemo: (role?: 'farmer' | 'consumer' | 'logistics' | 'fpo', name?: string, phone?: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Helper to sync or create user in Firestore
  const syncUserProfile = async (
    fUser: FirebaseUser,
    role: 'farmer' | 'consumer' | 'logistics' | 'fpo' = 'farmer',
    details?: Partial<User>
  ): Promise<User> => {
    try {
      const userRef = doc(db, 'users', fUser.uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as User;
        const completeUser: User = {
          ...data,
          id: fUser.uid,
          phone: fUser.phoneNumber || data.phone || '',
          email: fUser.email || data.email || '',
        };
        setUser(completeUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('agriflow_user', JSON.stringify(completeUser));
        }
        return completeUser;
      } else {
        const newUser: User = {
          id: fUser.uid,
          name: details?.name || fUser.displayName || 'Verified AgriFlow User',
          phone: fUser.phoneNumber || details?.phone || '',
          email: fUser.email || details?.email || '',
          role: role || 'farmer',
          location: details?.location || 'Telangana, India',
          farmName: details?.farmName || (role === 'farmer' ? 'Green Valley Agro Farm' : undefined),
          farmerType: details?.farmerType || (role === 'farmer' ? 'Individual Farmer' : undefined),
          createdAt: new Date().toISOString(),
          ...details,
        };
        await setDoc(userRef, newUser);
        setUser(newUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('agriflow_user', JSON.stringify(newUser));
        }
        return newUser;
      }
    } catch {
      // Fallback if Firestore rules are not yet published or offline
      const fallbackUser: User = {
        id: fUser.uid,
        name: details?.name || fUser.displayName || 'Verified User',
        phone: fUser.phoneNumber || details?.phone || '',
        email: fUser.email || details?.email || '',
        role: role || 'farmer',
        location: details?.location || 'Telangana, India',
        farmName: details?.farmName || (role === 'farmer' ? 'Green Valley Agro Farm' : undefined),
        farmerType: details?.farmerType || (role === 'farmer' ? 'Individual Farmer' : undefined),
        createdAt: new Date().toISOString(),
        ...details,
      };
      setUser(fallbackUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('agriflow_user', JSON.stringify(fallbackUser));
      }
      return fallbackUser;
    }
  };

  // Restore session via Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        // Try localStorage cache first for instant UI response
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem('agriflow_user');
          if (cached) {
            try {
              setUser(JSON.parse(cached));
            } catch {
              // ignore
            }
          }
        }
        await syncUserProfile(fUser);
      } else {
        // Check for local demo login fallback
        if (typeof window !== 'undefined') {
          const localDemo = localStorage.getItem('agriflow_demo_user');
          if (localDemo) {
            try {
              setUser(JSON.parse(localDemo));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initialize invisible reCAPTCHA for Phone Auth
  const setupRecaptcha = (containerId: string = 'recaptcha-container'): RecaptchaVerifier => {
    if (typeof window === 'undefined') {
      throw new Error('reCAPTCHA can only be initialized in the browser');
    }

    // Clear previous instance if attached to window
    const windowWithRecaptcha = window as unknown as { recaptchaVerifier?: RecaptchaVerifier };
    if (windowWithRecaptcha.recaptchaVerifier) {
      try {
        windowWithRecaptcha.recaptchaVerifier.clear();
      } catch {
        // ignore
      }
    }

    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
      'expired-callback': () => {
        // reCAPTCHA expired
      },
    });

    windowWithRecaptcha.recaptchaVerifier = verifier;
    return verifier;
  };

  // Send Phone OTP
  const sendPhoneOtp = async (phoneNumber: string, containerId: string = 'recaptcha-container'): Promise<ConfirmationResult> => {
    setIsLoading(true);
    try {
      // Ensure E.164 format (+91XXXXXXXXXX)
      let formattedPhone = phoneNumber.trim().replace(/\s+/g, '');
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = `+91${formattedPhone}`;
      }

      const verifier = setupRecaptcha(containerId);
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, verifier);
      setIsLoading(false);
      return confirmation;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  // Verify Phone OTP
  const verifyPhoneOtp = async (
    confirmationResult: ConfirmationResult,
    otp: string,
    role: 'farmer' | 'consumer' | 'logistics' | 'fpo' = 'farmer',
    details?: Partial<User>
  ): Promise<User> => {
    setIsLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const loggedUser = await syncUserProfile(userCredential.user, role, details);
      setIsLoading(false);
      return loggedUser;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  // Google Sign-In
  const loginWithGoogle = async (role: 'farmer' | 'consumer' | 'logistics' | 'fpo' = 'farmer'): Promise<User> => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const loggedUser = await syncUserProfile(userCredential.user, role);
      setIsLoading(false);
      return loggedUser;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  // Instant Demo Login (for Hackathon pitch & offline testing)
  const loginWithDemo = async (
    role: 'farmer' | 'consumer' | 'logistics' | 'fpo' = 'farmer',
    name: string = 'Ramesh Reddy',
    phone: string = '+91 98480 12345'
  ): Promise<User> => {
    setIsLoading(true);
    const demoUser: User = {
      id: `demo_${role}_${Date.now()}`,
      name,
      phone,
      email: `${role}@agriflow.ai`,
      role,
      location: 'Shadnagar, Ranga Reddy, Telangana',
      farmName: role === 'farmer' ? 'Sri Lakshmi Venkateshwara Farm Cluster' : undefined,
      farmerType: role === 'farmer' ? 'FPO' : undefined,
      createdAt: new Date().toISOString(),
    };

    setUser(demoUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agriflow_demo_user', JSON.stringify(demoUser));
      localStorage.setItem('agriflow_user', JSON.stringify(demoUser));
    }
    setIsLoading(false);
    return demoUser;
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agriflow_user');
      localStorage.removeItem('agriflow_demo_user');
    }
    setUser(null);
    setFirebaseUser(null);
    router.push('/');
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      await syncUserProfile(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated: !!user,
        isLoading,
        setupRecaptcha,
        sendPhoneOtp,
        verifyPhoneOtp,
        loginWithGoogle,
        loginWithDemo,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
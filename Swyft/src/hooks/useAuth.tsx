import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export interface AppUser extends User {
    role?: 'Student' | 'Driver' | 'Delivery and Pick up' | 'Admin';
    fullName?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // SPECIAL ADMIN CHECK
        if (user.email === 'teniola4olamilekan2020@gmail.com') {
          setUser({ ...user, role: 'Admin' });
          setLoading(false);
          return;
        }

        // User is signed in, get their custom data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ ...user, ...userDoc.data() } as AppUser);
        } else {
          // Should not happen in normal flow
          setUser(user);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe on cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

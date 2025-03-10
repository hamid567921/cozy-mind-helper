
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a dummy user
const dummyUser: User = {
  id: 'dummy-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

// Create a dummy session
const dummySession: Session = {
  access_token: 'dummy-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: 'dummy-refresh-token',
  user: dummyUser,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(dummyUser);
  const [session, setSession] = useState<Session | null>(dummySession);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate automatic login
  useEffect(() => {
    console.log('Auto-authentication with dummy user');
    setUser(dummyUser);
    setSession(dummySession);
    setIsLoading(false);
  }, []);

  const signOut = async () => {
    try {
      setIsLoading(true);
      // We don't actually sign out from Supabase since we're using a dummy user
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
        duration: 3000,
      });
      
      // For demo purposes, we'll just reload the page
      window.location.reload();
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

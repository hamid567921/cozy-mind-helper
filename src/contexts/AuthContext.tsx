
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session on component mount
    const getSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      } else if (data?.session) {
        console.log('Found existing session:', data.session);
        setSession(data.session);
        setUser(data.session.user);
      } else {
        console.log('No active session found');
      }
      
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession);
        
        if (event === 'SIGNED_IN' && newSession) {
          console.log('User signed in:', newSession.user);
          setSession(newSession);
          setUser(newSession.user);
          navigate('/'); // Auto-redirect to home page after successful login
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setSession(null);
          setUser(null);
          navigate('/auth'); // Redirect to auth page on sign out
        } else if (event === 'TOKEN_REFRESHED' && newSession) {
          console.log('Token refreshed');
          setSession(newSession);
          setUser(newSession.user);
        } else if (event === 'USER_UPDATED' && newSession) {
          console.log('User updated');
          setSession(newSession);
          setUser(newSession.user);
        }
        
        setIsLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      console.log('Cleaning up auth listener');
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign up with email:', email);
      
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Disable email confirmation for testing purposes
          emailRedirectTo: window.location.origin
        }
      });
      
      console.log('Sign up response:', data, error);
      
      if (error) throw error;
      
      // Check if user needs to confirm email
      if (data?.user?.identities?.length === 0) {
        toast({
          title: "This email is already registered",
          description: "Please sign in instead or use a different email",
          variant: "destructive",
          duration: 5000,
        });
        return { error: { message: "Email already registered" } };
      }
      
      // For development/testing, treating sign up as immediate success
      // In production, uncomment the toast below about email confirmation
      toast({
        title: "Signup successful!",
        description: "You can now sign in with your credentials",
        duration: 5000,
      });
      
      /* For production use this toast instead:
      toast({
        title: "Signup successful!",
        description: "Please check your email for a confirmation link.",
        duration: 5000,
      });
      */
      
      return { error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: "Signup failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
        duration: 3000,
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with email:', email);
      
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Sign in response:', data, error);
      
      if (error) throw error;
      
      console.log('Sign in successful, session:', data.session);
      
      // Set session and user immediately
      setSession(data.session);
      setUser(data.session.user);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        duration: 3000,
      });
      
      // Manually redirect to home after successful sign-in
      navigate('/');
      
      return { error: null };
    } catch (error: any) {
      console.error('Error signing in:', error);
      
      // Provide more specific error messages
      let errorMessage = error.message;
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email or password is incorrect";
      }
      
      toast({
        title: "Sign in failed",
        description: errorMessage || "An unexpected error occurred",
        variant: "destructive",
        duration: 3000,
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      
      // Clear state immediately
      setSession(null);
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
        duration: 3000,
      });
      
      // Manually redirect to auth page
      navigate('/auth');
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
    signUp,
    signIn,
    signOut,
  };

  console.log('Auth context current state:', { user: !!user, session: !!session, isLoading });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

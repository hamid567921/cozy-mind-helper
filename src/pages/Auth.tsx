
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import wavesImage from '../assets/waves.svg';

const Auth = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();

  console.log('Auth page rendered with user:', !!user, 'session:', !!session);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && session) {
      console.log('User is authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, session, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="relative px-6 py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-blue-50 flex-1">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={wavesImage} 
            alt="" 
            className="absolute bottom-0 w-full h-48 object-cover object-bottom animate-wave opacity-30" 
          />
        </div>
        
        <div className="flex flex-col items-center justify-center max-w-md mx-auto relative z-10">
          <AuthHeader />
          <AuthCard />
        </div>
      </div>
    </div>
  );
};

export default Auth;

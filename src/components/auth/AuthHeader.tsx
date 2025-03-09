
import React from 'react';
import logo from '@/assets/logo.svg';

export const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <img src={logo} alt="MindfulAI" className="h-10 w-10" />
        <h1 className="text-2xl font-medium bg-gradient-to-r from-wellness-600 to-calm-500 bg-clip-text text-transparent">MindfulAI</h1>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">Welcome to Your Wellness Journey</h2>
      <p className="text-gray-600 mt-2">Sign in or create an account to personalize your experience</p>
    </div>
  );
};

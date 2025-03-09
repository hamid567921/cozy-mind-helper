
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

export const AuthFooter = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Separator />
      <p className="text-xs text-center text-gray-500">
        By continuing, you agree to MindfulAI's Terms of Service and Privacy Policy.
        <br />
        This is a demo application and not a substitute for professional mental health services.
      </p>
      <div className="mt-8">
        <Button 
          variant="outline" 
          className="text-sm"
          onClick={() => navigate('/')}
        >
          Return to Home
        </Button>
      </div>
    </>
  );
};

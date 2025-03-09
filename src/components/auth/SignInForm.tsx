
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting sign in form');
      const { error } = await signIn(email, password);
      
      if (!error) {
        console.log('Sign in successful, redirecting to home');
        toast.success('Signed in successfully!');
        
        // Force a small delay before redirecting to allow auth state to update
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input 
          id="signin-email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password">Password</Label>
          <a 
            href="#" 
            className="text-xs text-wellness-600 hover:text-wellness-700"
            onClick={(e) => {
              e.preventDefault();
              toast.info('Password reset functionality coming soon!');
            }}
          >
            Forgot password?
          </a>
        </div>
        <Input 
          id="signin-password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-wellness-600 to-calm-500 hover:from-wellness-700 hover:to-calm-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
};

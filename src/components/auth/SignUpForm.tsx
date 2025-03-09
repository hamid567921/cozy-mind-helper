
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();

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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting sign up form');
      const { error } = await signUp(email, password);
      
      if (!error) {
        // Since signUp was successful, we can clear the form
        setEmail('');
        setPassword('');
        toast.success('Account created! Please check your email for verification.', {
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input 
          id="signup-email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input 
          id="signup-password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
        />
        <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-wellness-600 to-calm-500 hover:from-wellness-700 hover:to-calm-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>
    </form>
  );
};

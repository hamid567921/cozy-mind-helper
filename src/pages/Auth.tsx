
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import logo from '../assets/logo.svg';
import wavesImage from '../assets/waves.svg';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, user, session } = useAuth();
  const navigate = useNavigate();

  console.log('Auth page rendered with user:', !!user, 'session:', !!session);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && session) {
      console.log('User is authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, session, navigate]);

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
        
        // For testing purposes, you might want to automatically sign in after sign up
        // Uncomment the following block if you want to auto sign in
        /*
        try {
          await signIn(email, password);
          navigate('/');
        } catch (signInError) {
          console.error('Auto sign-in error:', signInError);
        }
        */
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src={logo} alt="MindfulAI" className="h-10 w-10" />
              <h1 className="text-2xl font-medium bg-gradient-to-r from-wellness-600 to-calm-500 bg-clip-text text-transparent">MindfulAI</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome to Your Wellness Journey</h2>
            <p className="text-gray-600 mt-2">Sign in or create an account to personalize your experience</p>
          </div>
          
          <Card className="w-full shadow-lg animate-fade-in">
            <Tabs defaultValue="signin" className="w-full">
              <CardHeader>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent>
                <TabsContent value="signin">
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
                </TabsContent>
                
                <TabsContent value="signup">
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
                </TabsContent>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Separator />
                <p className="text-xs text-center text-gray-500">
                  By continuing, you agree to MindfulAI's Terms of Service and Privacy Policy.
                  <br />
                  This is a demo application and not a substitute for professional mental health services.
                </p>
              </CardFooter>
            </Tabs>
          </Card>
          
          <div className="mt-8">
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

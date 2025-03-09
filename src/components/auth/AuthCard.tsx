
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { AuthFooter } from './AuthFooter';

export const AuthCard = () => {
  return (
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
            <SignInForm />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <AuthFooter />
        </CardFooter>
      </Tabs>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthFooter } from './AuthFooter';

// This is a placeholder component since we're using dummy authentication
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
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Sign-in functionality has been replaced with automatic dummy authentication.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="signup">
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Sign-up functionality has been replaced with automatic dummy authentication.
              </p>
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <AuthFooter />
        </CardFooter>
      </Tabs>
    </Card>
  );
};

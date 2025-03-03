
import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from '../assets/logo.svg';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleGetStarted = () => {
    navigate(user ? '/' : '/auth');
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <img src={logo} alt="MindfulAI" className="h-8 w-8" />
          <h1 className="text-xl font-medium bg-gradient-to-r from-wellness-600 to-calm-500 bg-clip-text text-transparent">MindfulAI</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer border-2 border-wellness-100 hover:border-wellness-200 transition-all">
                <AvatarImage src="" />
                <AvatarFallback className="bg-wellness-100 text-wellness-700">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-500">
                {user.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="ghost" className="text-sm font-medium" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-wellness-600 to-calm-500 text-white hover:from-wellness-700 hover:to-calm-600 transition-all duration-300"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

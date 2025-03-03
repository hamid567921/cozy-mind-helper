
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '../assets/logo.svg';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
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
        <Button variant="ghost" className="text-sm font-medium">Sign In</Button>
        <Button className="bg-gradient-to-r from-wellness-600 to-calm-500 text-white hover:from-wellness-700 hover:to-calm-600 transition-all duration-300">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;

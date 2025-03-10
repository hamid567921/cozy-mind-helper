
import React, { useState } from 'react';
import { ChevronLeft, Activity, BookOpen, Smile, Heart, Calendar, Phone, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectPage: (page: string) => void;
  activePage: string;
}

interface SidebarNavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItem> = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-wellness-50",
        active ? "bg-wellness-50 text-wellness-700" : "text-gray-600"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-wellness-700" : "text-gray-500")} />
      <span className="font-medium">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSelectPage, activePage }) => {
  const handleNavClick = (label: string) => {
    onSelectPage(label.toLowerCase());
    if (window.innerWidth < 1024) { // Close sidebar on mobile after selection
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-50 w-72 transition-transform duration-300 ease-in-out transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Menu</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <SidebarNavItem 
              icon={Smile} 
              label="Chat" 
              active={activePage === "chat"}
              onClick={() => handleNavClick("Chat")} 
            />
            <SidebarNavItem 
              icon={Activity} 
              label="Mood Tracker" 
              active={activePage === "mood"}
              onClick={() => handleNavClick("Mood Tracker")} 
            />
            <SidebarNavItem 
              icon={Calendar} 
              label="Daily Check-in" 
              active={activePage === "daily check-in"}
              onClick={() => handleNavClick("Daily Check-in")} 
            />
            <SidebarNavItem 
              icon={Heart} 
              label="Self-care Tools" 
              active={activePage === "self-care tools"}
              onClick={() => handleNavClick("Self-care Tools")} 
            />
            <SidebarNavItem 
              icon={BookOpen} 
              label="Resources" 
              active={activePage === "resources"}
              onClick={() => handleNavClick("Resources")} 
            />
          </nav>
          
          <div className="p-4 border-t">
            <button 
              onClick={() => handleNavClick("Emergency Support")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200"
            >
              <Phone className="h-5 w-5" />
              <span>Emergency Support</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

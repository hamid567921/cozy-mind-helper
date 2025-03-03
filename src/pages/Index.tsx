import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import MoodTrackerWrapper from '@/components/MoodTrackerWrapper';
import ResourcesPanel from '@/components/ResourcesPanel';
import EmergencySupport from '@/components/EmergencySupport';
import wavesImage from '@/assets/waves.svg';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodTrackerWrapper />;
      case 'resources':
        return <ResourcesPanel />;
      case 'emergency':
        return <EmergencySupport />;
      case 'chat':
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 transition-all duration-300 lg:ml-72">
        {/* Hero section */}
        <section className="relative px-6 py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-blue-50">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={wavesImage} 
              alt="" 
              className="absolute bottom-0 w-full h-48 object-cover object-bottom animate-wave opacity-30" 
            />
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-3 py-1 text-sm font-medium bg-wellness-100 text-wellness-800 rounded-full mb-4 animate-fade-in">
              Your Personal Mental Wellness Companion
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-wellness-700 via-wellness-600 to-calm-500 bg-clip-text text-transparent animate-fade-in">
              Support for Your Mental Wellbeing Journey
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Connect with MindfulAI for personalized conversation, mood tracking, and access to mental wellness resources — all in one thoughtfully designed space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'chat' 
                    ? 'bg-wellness-600 text-white hover:bg-wellness-700' 
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                Chat Now
              </button>
              
              <button 
                onClick={() => setActiveTab('mood')}
                className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'mood' 
                    ? 'bg-calm-500 text-white hover:bg-calm-600' 
                    : 'bg-white border border-calm-200 text-calm-700 hover:bg-calm-50'
                }`}
              >
                Track Mood
              </button>
              
              <button 
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'resources' 
                    ? 'bg-wellness-800 text-white hover:bg-wellness-900' 
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                Resources
              </button>
            </div>
          </div>
        </section>
        
        {/* Content section */}
        <section className="px-4 py-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500 animate-scale-in">
            <div className="h-[calc(100vh-350px)] min-h-[500px]">
              {renderContent()}
            </div>
          </div>
        </section>
        
        {/* Footer section */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                © 2023 MindfulAI. This is a demo application. Not a substitute for professional mental health services.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => setActiveTab('emergency')}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Emergency Resources
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;

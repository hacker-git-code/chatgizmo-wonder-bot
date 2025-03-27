
import React, { useEffect, useState } from 'react';
import WelcomeHeader from '@/components/WelcomeHeader';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // Add mounted state to ensure animations start after component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto animate-fade-in">
        <WelcomeHeader />
        
        <div className="flex flex-col items-center w-full animate-slide-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <div className="w-full px-0 sm:px-6">
            <ChatInterface className="h-[70vh] md:h-[65vh]" />
            
            <p className="text-center text-xs text-muted-foreground mt-6">
              Designed with simplicity and elegance • A harmonious interaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React, { useEffect, useState } from 'react';
import WelcomeHeader from '@/components/WelcomeHeader';
import ChatInterface from '@/components/ChatInterface';
import { Sparkles, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(window.innerHeight < 700);

  // Add mounted state to ensure animations start after component mount
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsCompactMode(window.innerHeight < 700);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-2 sm:p-4 bg-dot-pattern">
      <div className="w-full max-w-4xl mx-auto animate-fade-in h-[calc(100vh-2rem)] flex flex-col overflow-hidden">
        {!isCompactMode && <WelcomeHeader />}
        
        {isCompactMode && (
          <div className="flex items-center justify-between px-4 py-2 animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">WonderChat</span>
            </div>
            <div className="flex items-center bg-primary/20 rounded-full px-2 py-0.5">
              <Sparkles className="h-3 w-3 text-primary mr-1" />
              <span className="text-xs font-medium text-primary">AI Assistant</span>
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col w-full animate-slide-in opacity-0" 
             style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className={cn(
            "w-full px-0 sm:px-4 flex-1 flex flex-col",
            isCompactMode ? "pt-1" : "pt-2"
          )}>
            <ChatInterface className={cn(
              "flex-1 flex flex-col",
              isCompactMode ? "max-h-[88vh]" : "max-h-[80vh]"
            )} />
            
            <p className={cn(
              "text-center text-xs text-muted-foreground", 
              isCompactMode ? "mt-2 mb-1" : "mt-4"
            )}>
              <span className="px-3 py-1 rounded-full glass-morphism">
                Designed with care • Powered by AI
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

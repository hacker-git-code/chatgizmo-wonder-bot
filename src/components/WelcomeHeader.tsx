
import React from 'react';
import { Sparkles } from 'lucide-react';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="animate-fade-in text-center mb-4 px-4">
      <div className="inline-block mb-1.5">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-primary/20 text-primary px-3 py-1 rounded-full">
          <Sparkles className="h-3 w-3" />
          <span>AI Assistant</span>
        </div>
      </div>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
        Welcome to <span className="text-gradient">WonderChat</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Experience a powerful conversation with our AI. Ask anything and get intelligent, helpful responses.
      </p>
    </div>
  );
};

export default WelcomeHeader;

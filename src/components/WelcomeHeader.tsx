
import React from 'react';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="animate-fade-in text-center mb-8 px-6">
      <div className="inline-block mb-2">
        <span className="text-xs uppercase tracking-wider font-semibold bg-primary/20 text-primary px-3 py-1 rounded-full">
          AI Assistant
        </span>
      </div>
      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
        Welcome to <span className="text-gradient">WonderChat</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        Experience a powerful conversation with our AI. Ask anything and get intelligent, helpful responses.
      </p>
    </div>
  );
};

export default WelcomeHeader;

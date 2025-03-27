
import React from 'react';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="animate-fade-in text-center mb-8 px-6">
      <div className="inline-block">
        <span className="text-xs uppercase tracking-wider font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
          Chatbot
        </span>
      </div>
      <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
        Welcome to <span className="text-primary">WonderChat</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        Experience a beautifully designed conversation. I'm here to assist you with anything you need.
      </p>
    </div>
  );
};

export default WelcomeHeader;

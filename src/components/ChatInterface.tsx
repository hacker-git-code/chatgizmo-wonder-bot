
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Loader2 } from 'lucide-react';
import { useChat } from '@/utils/chatUtils';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { messages, isTyping, handleSendMessage, messagesEndRef } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize with a welcome message if there are no messages
  useEffect(() => {
    if (messages.length === 0) {
      handleSendMessage("Hi there! I'm your AI assistant. How can I help you today?");
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      handleSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 subtle-scroll rounded-2xl glass-morphism">
        <div className="flex flex-col space-y-2 pb-4">
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message}
              isLastMessage={index === messages.length - 1} 
            />
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="glass-morphism px-4 py-3 rounded-3xl rounded-tl-sm inline-block">
                <div className="typing-indicator flex space-x-1">
                  <span className="w-2 h-2 bg-primary/60 rounded-full"></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full"></span>
                  <span className="w-2 h-2 bg-primary/60 rounded-full"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <form 
        onSubmit={onSubmit}
        className={cn(
          "mt-4 chat-input-container neo-morphism rounded-2xl transition-all duration-300",
          isFocused ? "shadow-[0_0_0_2px_rgba(var(--primary)/0.5)] glow" : ""
        )}
      >
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-4 px-6 text-foreground placeholder:text-muted-foreground"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isTyping}
          />
          <div className="flex items-center pr-4 space-x-2">
            {isTyping ? (
              <Button 
                size="icon" 
                type="button" 
                disabled 
                className="animate-pulse opacity-70"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim()}
                  className={cn(
                    "rounded-full animated-gradient h-10 w-10 transition-transform duration-300",
                    inputValue.trim() ? "text-white" : "text-primary/50",
                    inputValue.trim() ? "hover:scale-105" : "cursor-not-allowed opacity-70"
                  )}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;

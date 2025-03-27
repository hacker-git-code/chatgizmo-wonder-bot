
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Loader2, Settings, RefreshCw, Copy, ImagePlus, Download, PanelLeftClose, PanelLeftOpen, Sparkles } from 'lucide-react';
import { useChat } from '@/utils/chatUtils';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const { toast } = useToast();
  
  const { 
    messages, 
    isTyping, 
    handleSendMessage, 
    messagesEndRef, 
    clearChat,
    copyConversation 
  } = useChat();
  
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

  // Function to download conversation as text file
  const downloadConversation = () => {
    const text = messages.map(m => `${m.sender === 'user' ? 'You' : 'AI'}: ${m.content}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversation downloaded",
      description: "Your chat has been saved as a text file",
      duration: 2000,
    });
  };

  return (
    <div className={cn("w-full flex flex-col relative", className)}>
      {/* Floating AI icon */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
      </div>
      
      {/* Chat Header with Controls */}
      <div className="flex items-center justify-between mb-3 px-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCompactMode(!isCompactMode)} 
          className="text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          {isCompactMode ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button>
        
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearChat}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={copyConversation}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={downloadConversation}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <ScrollArea className="flex-1 p-3 subtle-scroll rounded-2xl glass-morphism">
        <div className="flex flex-col space-y-2 pb-1">
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message}
              isLastMessage={index === messages.length - 1}
              isCompact={isCompactMode}
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
      </ScrollArea>
      
      {/* Input Area with Features */}
      <form 
        onSubmit={onSubmit}
        className={cn(
          "mt-3 chat-input-container neo-morphism rounded-2xl transition-all duration-300",
          isFocused ? "shadow-[0_0_0_2px_rgba(var(--primary)/0.5)] glow" : ""
        )}
      >
        <div className="relative flex items-center">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            className="ml-1 rounded-full h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-3 px-2 text-foreground placeholder:text-muted-foreground"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isTyping}
          />
          
          <div className="flex items-center pr-2 space-x-1">
            {isTyping ? (
              <Button 
                size="icon" 
                type="button" 
                disabled 
                className="animate-pulse opacity-70 h-9 w-9"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <>
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim()}
                  className={cn(
                    "rounded-full animated-gradient h-9 w-9 transition-transform duration-300",
                    inputValue.trim() ? "text-white" : "text-primary/50",
                    inputValue.trim() ? "hover:scale-105" : "cursor-not-allowed opacity-70"
                  )}
                >
                  <Send className="h-4 w-4" />
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

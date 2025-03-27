
import React, { useState } from 'react';
import { Message, formatTime } from '@/utils/chatUtils';
import { cn } from '@/lib/utils';
import { MessageSquare, User, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MessageBubbleProps {
  message: Message;
  isLastMessage: boolean;
  isCompact?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLastMessage, isCompact = false }) => {
  const isUser = message.sender === 'user';
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);
  
  const copyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setHasCopied(true);
    
    toast({
      title: "Message copied",
      description: "Message content copied to clipboard",
      duration: 2000,
    });
    
    setTimeout(() => setHasCopied(false), 2000);
  };
  
  const handleFeedback = (type: 'positive' | 'negative') => {
    toast({
      title: type === 'positive' ? "Thanks for the feedback!" : "We'll improve next time",
      description: type === 'positive' 
        ? "We're glad this response was helpful" 
        : "We'll use your feedback to improve",
      duration: 2000,
    });
  };
  
  return (
    <div 
      className={cn(
        "message-appear w-full flex mb-3",
        isUser ? "justify-end" : "justify-start",
        isLastMessage && "mb-4"
      )}
      style={{ 
        animationDelay: `${Math.random() * 0.2}s`,
        opacity: 0 // Start with opacity 0, animation will make it visible
      }}
    >
      {!isUser && !isCompact && (
        <div className="flex items-start mr-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl flex flex-col relative group shadow-sm",
          isUser 
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm" 
            : "glass-morphism rounded-tl-sm"
        )}
      >
        <div className={cn("text-sm", isCompact ? "leading-snug" : "sm:text-base")}>{message.content}</div>
        <div 
          className={cn(
            "text-[10px] mt-1 self-end opacity-70",
            isUser ? "text-white/80" : "text-foreground/70"
          )}
        >
          {formatTime(message.timestamp)}
        </div>
        
        {/* Message actions that appear on hover */}
        <div className={cn(
          "absolute -bottom-8 right-0 glass-morphism rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex",
          isUser ? "left-0 right-auto" : "right-0 left-auto"
        )}>
          <button 
            onClick={copyMessage} 
            className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
          >
            {hasCopied ? 
              <Check className="w-3 h-3 text-green-400" /> : 
              <Copy className="w-3 h-3 text-muted-foreground" />
            }
          </button>
          
          {!isUser && (
            <>
              <button 
                onClick={() => handleFeedback('positive')} 
                className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
              >
                <ThumbsUp className="w-3 h-3 text-muted-foreground" />
              </button>
              <button 
                onClick={() => handleFeedback('negative')} 
                className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
              >
                <ThumbsDown className="w-3 h-3 text-muted-foreground" />
              </button>
            </>
          )}
        </div>
      </div>
      
      {isUser && !isCompact && (
        <div className="flex items-start ml-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md">
            <User className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

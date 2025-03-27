
import React from 'react';
import { Message, formatTime } from '@/utils/chatUtils';
import { cn } from '@/lib/utils';
import { MessageSquare, User, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLastMessage: boolean;
  isCompact?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLastMessage, isCompact = false }) => {
  const isUser = message.sender === 'user';
  
  const copyMessage = () => {
    navigator.clipboard.writeText(message.content);
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
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <MessageSquare className="w-3 h-3" />
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl flex flex-col relative group",
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
          "absolute -bottom-7 right-0 glass-morphism rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex",
          isUser ? "left-0 right-auto" : "right-0 left-auto"
        )}>
          <button onClick={copyMessage} className="rounded-full p-1 hover:bg-white/10 transition-colors">
            <Copy className="w-3 h-3 text-muted-foreground" />
          </button>
          <button className="rounded-full p-1 hover:bg-white/10 transition-colors">
            <ThumbsUp className="w-3 h-3 text-muted-foreground" />
          </button>
          <button className="rounded-full p-1 hover:bg-white/10 transition-colors">
            <ThumbsDown className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      {isUser && !isCompact && (
        <div className="flex items-start ml-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <User className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

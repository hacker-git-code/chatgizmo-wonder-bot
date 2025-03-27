
import React from 'react';
import { Message, formatTime } from '@/utils/chatUtils';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isLastMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLastMessage }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={cn(
        "message-appear w-full flex mb-4",
        isUser ? "justify-end" : "justify-start",
        isLastMessage && "mb-6"
      )}
      style={{ 
        animationDelay: `${Math.random() * 0.2}s`,
        opacity: 0 // Start with opacity 0, animation will make it visible
      }}
    >
      <div 
        className={cn(
          "max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-3xl flex flex-col",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "glass-morphism rounded-tl-sm"
        )}
      >
        <div className="text-sm sm:text-base">{message.content}</div>
        <div 
          className={cn(
            "text-[10px] mt-1 self-end opacity-70",
            isUser ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

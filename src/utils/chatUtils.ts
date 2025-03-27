
import { useState, useEffect, useRef } from 'react';

// Define message types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Array of responses that will be randomly selected
const botResponses = [
  "I'm processing that information.",
  "That's an interesting perspective. Let me think about it.",
  "I can help you with that. What specific information do you need?",
  "Thanks for sharing. Is there anything else you'd like to discuss?",
  "I understand what you're asking. Here's what I think...",
  "That's a great question. The answer depends on several factors.",
  "I've processed your request and have some insights to share.",
  "I appreciate your patience. Let me work through this for you.",
  "I see what you're looking for. Here's my recommendation.",
  "Based on what you've told me, I suggest the following approach."
];

// Simulate a typing delay with realistic variable timing
export const simulateTypingDelay = (messageLength: number): Promise<void> => {
  // Base delay + variable component based on message length
  // Roughly 30-80 chars per second typing speed (human-like)
  const baseDelay = 800; // milliseconds
  const variableDelay = messageLength * (Math.random() * 30 + 20); // 20-50ms per character
  const maxDelay = 5000; // Cap at 5 seconds for very long messages
  
  const totalDelay = Math.min(baseDelay + variableDelay, maxDelay);
  
  return new Promise(resolve => setTimeout(resolve, totalDelay));
};

// Generate a response based on user input
export const generateResponse = async (userMessage: string): Promise<string> => {
  // In a real app, this would connect to an AI service
  // For now, we'll use randomly selected responses with a simulated delay
  
  await simulateTypingDelay(userMessage.length);
  
  // Select a random response
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

// Custom hook for managing chat messages
export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to add a new message
  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  // Handle user message submission
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Add user message if it's from the user (not the initial bot message)
    if (messages.length > 0 || message !== "Hi there! I'm your AI assistant. How can I help you today?") {
      addMessage(message, message === "Hi there! I'm your AI assistant. How can I help you today?" ? 'bot' : 'user');
    } else {
      addMessage(message, 'bot');
      return;
    }
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Generate bot response
      const response = await generateResponse(message);
      addMessage(response, 'bot');
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage("I'm having trouble processing that. Could you try again?", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  // Clear all chat messages
  const clearChat = () => {
    setMessages([]);
    // Add the welcome message again
    setTimeout(() => {
      handleSendMessage("Hi there! I'm your AI assistant. How can I help you today?");
    }, 100);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, [messages]);

  return {
    messages,
    isTyping,
    handleSendMessage,
    messagesEndRef,
    clearChat,
  };
};

// Function to format timestamp
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

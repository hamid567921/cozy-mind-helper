
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message, generateResponse } from '@/lib/chatbot';
import { useToast } from "@/hooks/use-toast";

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm MindfulAI, your mental wellness companion. How are you feeling today? You can also ask me about mental health topics like 'What is depression?' or 'Tell me about anxiety'.",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Show toast for emergency messages if needed
      if (botResponse.includes('988') || botResponse.includes('Crisis')) {
        toast({
          title: "Important",
          description: "If you're in crisis, please contact emergency services or a mental health professional immediately.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-wellness-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-wellness-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-wellness-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-wellness-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-wellness-500 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="rounded-full bg-gray-100 border-0 focus-visible:ring-wellness-500"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            className="rounded-full bg-wellness-600 hover:bg-wellness-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

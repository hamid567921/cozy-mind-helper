
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; 
import { Message, generateResponse } from '@/lib/chatbot';
import { useToast } from "@/hooks/use-toast";

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm MindfulAI, your mental wellness companion. I can provide information on mental health topics like depression, anxiety, bipolar disorder, ADHD, and more. I can also help with coping strategies when you're feeling stressed or anxious. How can I assist you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current?.focus();
  }, []);

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
    
    // Simulate bot thinking with a variable response time based on message length
    // This makes it feel more natural, like the bot is actually reading and processing
    const thinkingTime = Math.min(1000 + input.length * 10, 3000); // Between 1-3 seconds
    
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
    }, thinkingTime);
    
    // Focus back on the input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send message on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
        <div className="flex flex-col space-y-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about mental health topics or share how you're feeling..."
            className="rounded-lg min-h-[80px] resize-none bg-gray-100 border-0 focus-visible:ring-wellness-500"
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              Press Enter to send, Shift+Enter for new line
            </div>
            <Button 
              onClick={handleSendMessage} 
              className="rounded-full bg-wellness-600 hover:bg-wellness-700 text-white px-4"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

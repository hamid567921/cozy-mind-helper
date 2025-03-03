
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
  const [inputValue, setInputValue] = useState(apiKey || '');
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  // Try to load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('geminiApiKey');
    if (savedKey) {
      setApiKey(savedKey);
      setInputValue(savedKey);
    }
  }, [setApiKey]);

  const handleSaveKey = () => {
    if (inputValue.trim()) {
      // Save to state and localStorage
      setApiKey(inputValue.trim());
      localStorage.setItem('geminiApiKey', inputValue.trim());
      
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved for this session.",
        duration: 3000,
      });
      
      // Hide the input after saving
      setIsVisible(false);
    } else {
      // Clear the API key if empty
      setApiKey(null);
      localStorage.removeItem('geminiApiKey');
      
      toast({
        title: "API Key Removed",
        description: "Your Gemini API key has been removed.",
        duration: 3000,
      });
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="mb-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleVisibility}
        className="flex items-center gap-2 text-sm"
      >
        <Key className="h-4 w-4" />
        {apiKey ? "Change API Key" : "Add Gemini API Key"}
      </Button>
      
      {isVisible && (
        <div className="mt-2 p-3 border rounded-md bg-gray-50">
          <div className="text-sm mb-2">
            Enter your Google Gemini API key to enhance chat responses:
          </div>
          <div className="flex gap-2">
            <Input
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Gemini API key"
              className="flex-1"
            />
            <Button onClick={handleSaveKey} size="sm">
              Save
            </Button>
          </div>
          <div className="text-xs mt-2 text-gray-500">
            Your key is stored locally and never sent to our servers.
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;

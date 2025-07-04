import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, MessageCircle } from 'lucide-react';

interface VoiceAssistantProps {
  onClose: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hey Bazar! How can I help you today?", isUser: false }
  ]);
  const [currentInput, setCurrentInput] = useState('');

  const responses = [
    "I can help you add products, find buyers, or check your sales!",
    "Would you like to list a new product or check your recent orders?",
    "Let me help you with your marketplace needs. What would you like to do?",
    "You can ask me about sales, products, deliveries, or anything else!",
    "I'm here to make your VocalKart experience better. How can I assist?"
  ];

  useEffect(() => {
    // Auto-play the greeting after a short delay
    const timer = setTimeout(() => {
      speakText("Hey Bazar! How can I help you today?");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    
    // Simulate voice input
    setTimeout(() => {
      const userInput = "How do I add a product?";
      setConversation(prev => [...prev, { text: userInput, isUser: true }]);
      setCurrentInput(userInput);
      setIsListening(false);
      
      // Simulate response
      setTimeout(() => {
        const response = responses[Math.floor(Math.random() * responses.length)];
        setConversation(prev => [...prev, { text: response, isUser: false }]);
        speakText(response);
      }, 1000);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    const quickResponses = {
      'Add Product': "To add a product, tap the 'Add Product by Voice' button and speak your item details!",
      'Check Sales': "Your sales this week: ₹1,200 from 6 items. Tomatoes were your best seller!",
      'Help': "I can help you navigate VocalKart, add products, check orders, and more. Just ask!"
    };
    
    const response = quickResponses[action as keyof typeof quickResponses];
    setConversation(prev => [
      ...prev,
      { text: action, isUser: true },
      { text: response, isUser: false }
    ]);
    speakText(response);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Voice Assistant</h3>
                <p className="text-amber-100 text-sm">VocalKart Helper</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-xl ${
                message.isUser 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gradient-to-r from-amber-100 to-orange-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.text}</p>
                {!message.isUser && (
                  <button
                    onClick={() => speakText(message.text)}
                    className="mt-1 text-xs text-amber-600 hover:text-amber-700 flex items-center"
                  >
                    <Volume2 className="w-3 h-3 mr-1" />
                    Play
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2 mb-3">
            {['Add Product', 'Check Sales', 'Help'].map((action) => (
              <button
                key={action}
                onClick={() => handleQuickAction(action)}
                className="flex-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-2 rounded-lg text-xs font-medium hover:from-amber-200 hover:to-orange-200 transition-all"
              >
                {action}
              </button>
            ))}
          </div>
          
          {/* Voice Input Button */}
          <button
            onClick={handleVoiceInput}
            disabled={isListening}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
              isListening 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg'
            }`}
          >
            {isListening ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Listening...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Mic className="w-5 h-5 mr-2" />
                Tap to Speak
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Volume2, Bot, Send, MicOff } from 'lucide-react';

interface AIVoiceChatbotProps {
  onClose: () => void;
  currentLanguage: string;
  userMode: 'seller' | 'buyer' | null;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIVoiceChatbot: React.FC<AIVoiceChatbotProps> = ({ onClose, currentLanguage, userMode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    'English': {
      greeting: "Hello! I'm your VocalKart AI assistant. How can I help you today?",
      listening: "Listening...",
      speaking: "Speaking...",
      tapToSpeak: "Tap to Speak",
      typeMessage: "Type your message...",
      send: "Send",
      voiceMode: "Voice",
      textMode: "Text"
    },
    'हिंदी': {
      greeting: "नमस्ते! मैं आपका VocalKart AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      listening: "सुन रहा हूं...",
      speaking: "बोल रहा हूं...",
      tapToSpeak: "बोलने के लिए टैप करें",
      typeMessage: "अपना संदेश टाइप करें...",
      send: "भेजें",
      voiceMode: "आवाज़",
      textMode: "टेक्स्ट"
    },
    'मराठी': {
      greeting: "नमस्कार! मी तुमचा VocalKart AI सहाय्यक आहे। आज मी तुम्हाला कशी मदत करू शकतो?",
      listening: "ऐकत आहे...",
      speaking: "बोलत आहे...",
      tapToSpeak: "बोलण्यासाठी टॅप करा",
      typeMessage: "तुमचा संदेश टाइप करा...",
      send: "पाठवा",
      voiceMode: "आवाज",
      textMode: "मजकूर"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      text: t.greeting,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([greeting]);
    
    // Speak greeting after a short delay
    setTimeout(() => {
      speakText(t.greeting);
    }, 500);
  }, [currentLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      // Set language based on current selection
      const langCodes: { [key: string]: string } = {
        'English': 'en-US',
        'हिंदी': 'hi-IN',
        'मराठी': 'mr-IN'
      };
      utterance.lang = langCodes[currentLanguage] || 'en-US';
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Fallback for browsers without speech recognition
      simulateVoiceInput();
      return;
    }

    setIsListening(true);
    
    // Simulate voice recognition for demo
    setTimeout(() => {
      simulateVoiceInput();
    }, 2000);
  };

  const simulateVoiceInput = () => {
    const sampleQueries = {
      'English': [
        "How do I add a product?",
        "What are my sales today?",
        "Help me with delivery",
        "Show me my orders"
      ],
      'हिंदी': [
        "मैं उत्पाद कैसे जोड़ूं?",
        "आज मेरी बिक्री क्या है?",
        "डिलीवरी में मदद करें",
        "मेरे ऑर्डर दिखाएं"
      ],
      'मराठी': [
        "मी उत्पादन कसे जोडू?",
        "आज माझी विक्री काय आहे?",
        "डिलिव्हरीमध्ये मदत करा",
        "माझे ऑर्डर दाखवा"
      ]
    };

    const queries = sampleQueries[currentLanguage as keyof typeof sampleQueries] || sampleQueries['English'];
    const userQuery = queries[Math.floor(Math.random() * queries.length)];
    
    const userMessage: Message = {
      text: userQuery,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsListening(false);
    
    // Generate AI response
    setTimeout(() => {
      generateAIResponse(userQuery);
    }, 1000);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    const userMessage: Message = {
      text: textInput,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const query = textInput;
    setTextInput('');
    
    // Generate AI response
    setTimeout(() => {
      generateAIResponse(query);
    }, 1000);
  };

  const generateAIResponse = (query: string) => {
    const responses = {
      'English': {
        product: "To add a product, go to the 'Add Products' section and use voice or text input to describe your item, set the price, and add quantity.",
        sales: "Your sales today: ₹1,200 from 6 items sold. Tomatoes were your best seller!",
        delivery: "For deliveries, you can choose self-delivery or assign to a local helper. Check the Deliveries section for more options.",
        orders: "You have 3 pending orders and 2 completed deliveries today. Would you like me to read them out?",
        default: "I can help you with adding products, checking sales, managing deliveries, or any other VocalKart features. What would you like to know?"
      },
      'हिंदी': {
        product: "उत्पाद जोड़ने के लिए, 'उत्पाद जोड़ें' सेक्शन में जाएं और अपनी वस्तु का वर्णन करने, कीमत सेट करने और मात्रा जोड़ने के लिए आवाज़ या टेक्स्ट इनपुट का उपयोग करें।",
        sales: "आज आपकी बिक्री: 6 वस्तुओं से ₹1,200। टमाटर आपका सबसे अच्छा विक्रेता था!",
        delivery: "डिलीवरी के लिए, आप स्व-डिलीवरी चुन सकते हैं या स्थानीय सहायक को असाइन कर सकते हैं। अधिक विकल्पों के लिए डिलीवरी सेक्शन देखें।",
        orders: "आपके पास आज 3 लंबित ऑर्डर और 2 पूर्ण डिलीवरी हैं। क्या आप चाहते हैं कि मैं उन्हें पढ़ूं?",
        default: "मैं उत्पाद जोड़ने, बिक्री जांचने, डिलीवरी प्रबंधन, या किसी अन्य VocalKart सुविधा में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?"
      },
      'मराठी': {
        product: "उत्पादन जोडण्यासाठी, 'उत्पादन जोडा' विभागात जा आणि तुमच्या वस्तूचे वर्णन करण्यासाठी, किंमत सेट करण्यासाठी आणि प्रमाण जोडण्यासाठी आवाज किंवा मजकूर इनपुट वापरा।",
        sales: "आज तुमची विक्री: 6 वस्तूंपासून ₹1,200. टोमॅटो तुमचा सर्वोत्तम विक्रेता होता!",
        delivery: "डिलिव्हरीसाठी, तुम्ही स्व-डिलिव्हरी निवडू शकता किंवा स्थानिक मदतनीसाला नियुक्त करू शकता. अधिक पर्यायांसाठी डिलिव्हरी विभाग पहा।",
        orders: "तुमच्याकडे आज 3 प्रलंबित ऑर्डर आणि 2 पूर्ण डिलिव्हरी आहेत. मी त्यांना वाचावे असे तुम्हाला वाटते का?",
        default: "मी उत्पादन जोडणे, विक्री तपासणे, डिलिव्हरी व्यवस्थापन, किंवा इतर कोणत्याही VocalKart वैशिष्ट्यांमध्ये तुमची मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?"
      }
    };

    const langResponses = responses[currentLanguage as keyof typeof responses] || responses['English'];
    
    let response = langResponses.default;
    
    if (query.toLowerCase().includes('product') || query.includes('उत्पाद') || query.includes('उत्पादन')) {
      response = langResponses.product;
    } else if (query.toLowerCase().includes('sales') || query.includes('बिक्री') || query.includes('विक्री')) {
      response = langResponses.sales;
    } else if (query.toLowerCase().includes('delivery') || query.includes('डिलीवरी') || query.includes('डिलिव्हरी')) {
      response = langResponses.delivery;
    } else if (query.toLowerCase().includes('order') || query.includes('ऑर्डर')) {
      response = langResponses.orders;
    }

    const aiMessage: Message = {
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    speakText(response);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-6 rounded-t-2xl flex items-center justify-between" style={{ backgroundColor: '#20639B' }}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Assistant</h3>
              <p className="text-blue-100 text-sm">VocalKart Helper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Input Mode Toggle */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setInputMode('voice')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
                inputMode === 'voice' 
                  ? 'text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ backgroundColor: inputMode === 'voice' ? '#3CAEA3' : 'transparent' }}
            >
              <Mic className="w-4 h-4" />
              <span>{t.voiceMode}</span>
            </button>
            <button
              onClick={() => setInputMode('text')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
                inputMode === 'text' 
                  ? 'text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ backgroundColor: inputMode === 'text' ? '#3CAEA3' : 'transparent' }}
            >
              <Send className="w-4 h-4" />
              <span>{t.textMode}</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-xl ${
                message.isUser 
                  ? 'text-white' 
                  : 'text-gray-800'
              }`}
              style={{ 
                backgroundColor: message.isUser ? '#20639B' : '#F2F4F7',
                border: message.isUser ? 'none' : '1px solid #E5E7EB'
              }}>
                <p className="text-sm">{message.text}</p>
                {!message.isUser && (
                  <button
                    onClick={() => speakText(message.text)}
                    className="mt-2 text-xs flex items-center hover:opacity-70 transition-opacity"
                    style={{ color: '#3CAEA3' }}
                  >
                    <Volume2 className="w-3 h-3 mr-1" />
                    Play
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          {inputMode === 'voice' ? (
            <button
              onClick={handleVoiceInput}
              disabled={isListening || isSpeaking}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                isListening || isSpeaking
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:opacity-90 shadow-lg'
              }`}
              style={{ backgroundColor: '#3CAEA3' }}
            >
              {isListening ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t.listening}
                </span>
              ) : isSpeaking ? (
                <span className="flex items-center justify-center">
                  <Volume2 className="w-5 h-5 mr-2 animate-pulse" />
                  {t.speaking}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Mic className="w-5 h-5 mr-2" />
                  {t.tapToSpeak}
                </span>
              )}
            </button>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder={t.typeMessage}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim()}
                className="px-4 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-all disabled:opacity-50"
                style={{ backgroundColor: '#3CAEA3' }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVoiceChatbot;
import React, { useState } from 'react';
import { ArrowLeft, Bot, Home } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import AddProductScreen from './components/AddProductScreen';
import BuyProductScreen from './components/BuyProductScreen';
import SalesAnalyticsScreen from './components/SalesAnalyticsScreen';
import DeliveriesScreen from './components/DeliveriesScreen';
import DeliveryStatusScreen from './components/DeliveryStatusScreen';
import ItemsListedScreen from './components/ItemsListedScreen';
import ProfileScreen from './components/ProfileScreen';
import HelpSupportScreen from './components/HelpSupportScreen';
import AIVoiceChatbot from './components/AIVoiceChatbot';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('mode-selection');
  const [userMode, setUserMode] = useState<'seller' | 'buyer' | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />;
  }

  const navigateTo = (screen: string) => {
    setNavigationHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    } else if (currentScreen === 'home') {
      setCurrentScreen('mode-selection');
      setUserMode(null);
    } else {
      setCurrentScreen('home');
    }
  };

  const goToModeSelection = () => {
    setCurrentScreen('mode-selection');
    setUserMode(null);
    setNavigationHistory([]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'mode-selection':
        return <ModeSelectionScreen onModeSelect={(mode) => {
          setUserMode(mode);
          setCurrentScreen('home');
        }} currentLanguage={currentLanguage} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} currentLanguage={currentLanguage} userMode={userMode} />;
      case 'add-product':
        return <AddProductScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'buy-product':
        return <BuyProductScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'sales':
        return <SalesAnalyticsScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'deliveries':
        return <DeliveriesScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'delivery-status':
        return <DeliveryStatusScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'items-listed':
        return <ItemsListedScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      case 'help':
        return <HelpSupportScreen onNavigate={navigateTo} currentLanguage={currentLanguage} />;
      default:
        return <HomeScreen onNavigate={navigateTo} currentLanguage={currentLanguage} userMode={userMode} />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      'mode-selection': 'Choose Your Mode',
      'home': 'VocalKart',
      'add-product': 'Add Products',
      'buy-product': 'Buy Products',
      'sales': 'Sales & Analytics',
      'deliveries': 'Deliveries',
      'delivery-status': 'Delivery Status',
      'items-listed': 'Items Listed',
      'profile': 'Profile & KYC',
      'help': 'Help & Support'
    };
    return titles[currentScreen as keyof typeof titles] || 'VocalKart';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F7' }}>
      {/* Innovative Header with Glassmorphism Effect */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Navigation */}
            <div className="flex items-center space-x-4">
              {/* Back Button with Animation */}
              <button
                onClick={goBack}
                className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#20639B' }}
                onMouseEnter={() => {
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance('Go back');
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <ArrowLeft className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Back
                </div>
              </button>

              {/* Mode Selection Button */}
              {currentScreen !== 'mode-selection' && (
                <button
                  onClick={goToModeSelection}
                  className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#3CAEA3' }}
                  onMouseEnter={() => {
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance('Change mode');
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  <Home className="w-6 h-6 text-white" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Modes
                  </div>
                </button>
              )}

              {/* Animated Title */}
              <div className="flex flex-col">
                <h1 
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
                  onMouseEnter={() => {
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(getPageTitle());
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  {getPageTitle()}
                </h1>
                {userMode && (
                  <span className="text-sm text-gray-500 capitalize animate-pulse">
                    {userMode} Mode
                  </span>
                )}
              </div>
            </div>
            
            {/* Right Side - Language Selector */}
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage} 
            />
          </div>
        </div>
      </header>

      {/* Main Content with Smooth Transitions */}
      <main className="container mx-auto px-4 py-6">
        <div className="animate-fadeIn">
          {renderScreen()}
        </div>
      </main>

      {/* Floating AI Chatbot with Pulse Animation */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 animate-pulse hover:animate-none"
        style={{ 
          background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)',
          boxShadow: '0 8px 32px rgba(32, 99, 155, 0.3)'
        }}
        onMouseEnter={() => {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Open AI assistant');
            window.speechSynthesis.speak(utterance);
          }
        }}
      >
        <Bot className="w-8 h-8 text-white animate-bounce" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        </div>
      </button>

      {/* AI Voice Chatbot Modal */}
      {showChatbot && (
        <AIVoiceChatbot 
          onClose={() => setShowChatbot(false)} 
          currentLanguage={currentLanguage}
          userMode={userMode}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .glassmorphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

export default App;
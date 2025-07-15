import React, { useState } from 'react';
import { ArrowLeft, Bot } from 'lucide-react';
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

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'mode-selection':
        return <ModeSelectionScreen onModeSelect={(mode) => {
          setUserMode(mode);
          setCurrentScreen('home');
        }} currentLanguage={currentLanguage} />;
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} userMode={userMode} />;
      case 'add-product':
        return <AddProductScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'buy-product':
        return <BuyProductScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'sales':
        return <SalesAnalyticsScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'deliveries':
        return <DeliveriesScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'delivery-status':
        return <DeliveryStatusScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'items-listed':
        return <ItemsListedScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      case 'help':
        return <HelpSupportScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} userMode={userMode} />;
    }
  };

  const canGoBack = currentScreen !== 'mode-selection' && currentScreen !== 'home';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F7' }}>
      {/* Header with Back Arrow and Language Selector */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {canGoBack && (
                <button
                  onClick={() => {
                    if (currentScreen === 'home') {
                      setCurrentScreen('mode-selection');
                      setUserMode(null);
                    } else {
                      setCurrentScreen('home');
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ color: '#20639B' }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>VocalKart</h1>
                <p className="text-sm text-gray-600">Voice-First Marketplace</p>
              </div>
            </div>
            
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderScreen()}
      </main>

      {/* Floating AI Chatbot Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
        style={{ backgroundColor: '#3CAEA3' }}
      >
        <Bot className="w-8 h-8 text-white" />
      </button>

      {/* AI Voice Chatbot Modal */}
      {showChatbot && (
        <AIVoiceChatbot 
          onClose={() => setShowChatbot(false)} 
          currentLanguage={currentLanguage}
          userMode={userMode}
        />
      )}
    </div>
  );
}

export default App;
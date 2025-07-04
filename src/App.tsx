import React, { useState } from 'react';
import { Mic, Home, ShoppingCart, PlusCircle, TrendingUp, Truck, User, Globe, MessageCircle, HelpCircle } from 'lucide-react';
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
import VoiceAssistant from './components/VoiceAssistant';
import LanguageToggle from './components/LanguageToggle';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('mode-selection');
  const [userMode, setUserMode] = useState<'seller' | 'buyer' | null>(null);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
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
        return <AddProductScreen onNavigate={setCurrentScreen} />;
      case 'buy-product':
        return <BuyProductScreen onNavigate={setCurrentScreen} />;
      case 'sales':
        return <SalesAnalyticsScreen onNavigate={setCurrentScreen} />;
      case 'deliveries':
        return <DeliveriesScreen onNavigate={setCurrentScreen} />;
      case 'delivery-status':
        return <DeliveryStatusScreen onNavigate={setCurrentScreen} />;
      case 'items-listed':
        return <ItemsListedScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      case 'help':
        return <HelpSupportScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} currentLanguage={currentLanguage} userMode={userMode} />;
    }
  };

  const getScreenTitle = () => {
    const titles = {
      'English': {
        'mode-selection': 'Choose Your Mode',
        'home': 'VocalKart',
        'add-product': 'Add Product',
        'buy-product': 'Buy Products',
        'sales': 'Sales & Analytics',
        'deliveries': 'Deliveries',
        'delivery-status': 'Delivery Status',
        'items-listed': 'Items Listed',
        'profile': 'Profile & KYC',
        'help': 'Help & Support'
      },
      'हिंदी': {
        'mode-selection': 'अपना मोड चुनें',
        'home': 'VocalKart',
        'add-product': 'उत्पाद जोड़ें',
        'buy-product': 'उत्पाद खरीदें',
        'sales': 'बिक्री और विश्लेषण',
        'deliveries': 'डिलीवरी',
        'delivery-status': 'डिलीवरी स्थिति',
        'items-listed': 'सूचीबद्ध वस्तुएं',
        'profile': 'प्रोफ़ाइल और KYC',
        'help': 'सहायता और समर्थन'
      },
      'मराठी': {
        'mode-selection': 'तुमचा मोड निवडा',
        'home': 'VocalKart',
        'add-product': 'उत्पादन जोडा',
        'buy-product': 'उत्पादन खरेदी करा',
        'sales': 'विक्री आणि विश्लेषण',
        'deliveries': 'डिलिव्हरी',
        'delivery-status': 'डिलिव्हरी स्थिती',
        'items-listed': 'सूचीबद्ध वस्तू',
        'profile': 'प्रोफाइल आणि KYC',
        'help': 'मदत आणि समर्थन'
      },
      'தமிழ்': {
        'mode-selection': 'உங்கள் பயன்முறையைத் தேர்ந்தெடுக்கவும்',
        'home': 'VocalKart',
        'add-product': 'தயாரிப்பு சேர்க்கவும்',
        'buy-product': 'தயாரிப்பு வாங்கவும்',
        'sales': 'விற்பனை மற்றும் பகுப்பாய்வு',
        'deliveries': 'டெலிவரிகள்',
        'delivery-status': 'டெலிவரி நிலை',
        'items-listed': 'பட்டியலிடப்பட்ட பொருட்கள்',
        'profile': 'சுயவிவரம் மற்றும் KYC',
        'help': 'உதவி மற்றும் ஆதரவு'
      },
      'తెలుగు': {
        'mode-selection': 'మీ మోడ్‌ను ఎంచుకోండి',
        'home': 'VocalKart',
        'add-product': 'ఉత్పత్తిని జోడించండి',
        'buy-product': 'ఉత్పత్తిని కొనుగోలు చేయండి',
        'sales': 'అమ్మకాలు మరియు విశ్లేషణలు',
        'deliveries': 'డెలివరీలు',
        'delivery-status': 'డెలివరీ స్థితి',
        'items-listed': 'జాబితా చేయబడిన వస్తువులు',
        'profile': 'ప్రొఫైల్ మరియు KYC',
        'help': 'సహాయం మరియు మద్దతు'
      },
      'ಕನ್ನಡ': {
        'mode-selection': 'ನಿಮ್ಮ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ',
        'home': 'VocalKart',
        'add-product': 'ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಿ',
        'buy-product': 'ಉತ್ಪನ್ನವನ್ನು ಖರೀದಿಸಿ',
        'sales': 'ಮಾರಾಟ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ',
        'deliveries': 'ಡೆಲಿವರಿಗಳು',
        'delivery-status': 'ಡೆಲಿವರಿ ಸ್ಥಿತಿ',
        'items-listed': 'ಪಟ್ಟಿ ಮಾಡಿದ ವಸ್ತುಗಳು',
        'profile': 'ಪ್ರೊಫೈಲ್ ಮತ್ತು KYC',
        'help': 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ'
      },
      'বাংলা': {
        'mode-selection': 'আপনার মোড নির্বাচন করুন',
        'home': 'VocalKart',
        'add-product': 'পণ্য যোগ করুন',
        'buy-product': 'পণ্য কিনুন',
        'sales': 'বিক্রয় এবং বিশ্লেষণ',
        'deliveries': 'ডেলিভারি',
        'delivery-status': 'ডেলিভারি স্ট্যাটাস',
        'items-listed': 'তালিকাভুক্ত আইটেম',
        'profile': 'প্রোফাইল এবং KYC',
        'help': 'সাহায্য এবং সহায়তা'
      }
    };

    const languageTitles = titles[currentLanguage as keyof typeof titles] || titles['English'];
    return languageTitles[currentScreen as keyof typeof languageTitles] || 'VocalKart';
  };

  const getTagline = () => {
    const taglines = {
      'English': 'Speak. Sell. Shop.',
      'हिंदी': 'बोलें। बेचें। खरीदें।',
      'मराठी': 'बोला। विका। खरेदी करा।',
      'தமிழ்': 'பேசுங்கள். விற்க. வாங்க.',
      'తెలుగు': 'మాట్లాడండి. అమ్మండి. కొనండి.',
      'ಕನ್ನಡ': 'ಮಾತನಾಡಿ. ಮಾರಿ. ಖರೀದಿಸಿ.',
      'বাংলা': 'কথা বলুন। বিক্রি করুন। কিনুন।'
    };
    return taglines[currentLanguage as keyof typeof taglines] || taglines['English'];
  };

  const getModeText = () => {
    const modeTexts = {
      'English': {
        'seller': 'Seller Mode',
        'buyer': 'Buyer Mode'
      },
      'हिंदी': {
        'seller': 'विक्रेता मोड',
        'buyer': 'खरीदार मोड'
      },
      'मराठी': {
        'seller': 'विक्रेता मोड',
        'buyer': 'खरेदीदार मोड'
      },
      'தமிழ்': {
        'seller': 'விற்பனையாளர் பயன்முறை',
        'buyer': 'வாங்குபவர் பயன்முறை'
      },
      'తెలుగు': {
        'seller': 'విక్రేత మోడ్',
        'buyer': 'కొనుగోలుదారు మోడ్'
      },
      'ಕನ್ನಡ': {
        'seller': 'ಮಾರಾಟಗಾರ ಮೋಡ್',
        'buyer': 'ಖರೀದಿದಾರ ಮೋಡ್'
      },
      'বাংলা': {
        'seller': 'বিক্রেতা মোড',
        'buyer': 'ক্রেতা মোড'
      }
    };
    
    const languageModes = modeTexts[currentLanguage as keyof typeof modeTexts] || modeTexts['English'];
    return userMode ? languageModes[userMode] : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{getScreenTitle()}</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">{getTagline()}</p>
                  {userMode && currentScreen !== 'mode-selection' && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        {getModeText()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {currentScreen !== 'mode-selection' && (
                <button
                  onClick={() => {
                    setCurrentScreen('mode-selection');
                    setUserMode(null);
                  }}
                  className="text-xs bg-blue-100 text-blue-800 px-3 py-2 rounded-full font-medium hover:bg-blue-200 transition-colors"
                >
                  Switch Mode
                </button>
              )}
              <button
                onClick={() => setCurrentScreen('help')}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <LanguageToggle currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      {currentScreen !== 'home' && currentScreen !== 'mode-selection' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-200 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-around py-2">
              <button
                onClick={() => setCurrentScreen('home')}
                className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
              </button>
              {userMode === 'seller' && (
                <button
                  onClick={() => setCurrentScreen('add-product')}
                  className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <PlusCircle className="w-6 h-6" />
                  <span className="text-xs mt-1">Add</span>
                </button>
              )}
              {userMode === 'buyer' && (
                <button
                  onClick={() => setCurrentScreen('buy-product')}
                  className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="text-xs mt-1">Buy</span>
                </button>
              )}
              {userMode === 'seller' && (
                <button
                  onClick={() => setCurrentScreen('sales')}
                  className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-xs mt-1">Sales</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Floating Voice Assistant */}
      <button
        onClick={() => setShowVoiceAssistant(true)}
        className="fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-pulse"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </button>

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} />
      )}
    </div>
  );
}

export default App;
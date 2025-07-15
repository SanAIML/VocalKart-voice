import React from 'react';
import { ShoppingCart, Store, Users, TrendingUp, Sparkles, Zap } from 'lucide-react';

interface ModeSelectionScreenProps {
  onModeSelect: (mode: 'seller' | 'buyer') => void;
  currentLanguage: string;
}

const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onModeSelect, currentLanguage }) => {
  const translations = {
    'English': {
      title: 'Choose Your Journey',
      subtitle: 'How would you like to experience VocalKart today?',
      sellerMode: 'Seller Mode',
      sellerDesc: 'Transform your business with voice',
      sellerFeatures: ['Voice-powered product listing', 'Smart sales analytics', 'Effortless delivery management', 'Real-time customer insights'],
      buyerMode: 'Buyer Mode',
      buyerDesc: 'Shop smarter with your voice',
      buyerFeatures: ['Voice search & discovery', 'Smart cart management', 'Direct vendor communication', 'Seamless order tracking'],
      getStarted: 'Start Your Journey',
      voicePowered: 'Voice-Powered Experience',
      aiDriven: 'AI-Driven Marketplace'
    },
    'हिंदी': {
      title: 'अपनी यात्रा चुनें',
      subtitle: 'आज आप VocalKart का अनुभव कैसे करना चाहते हैं?',
      sellerMode: 'विक्रेता मोड',
      sellerDesc: 'आवाज़ से अपने व्यापार को बदलें',
      sellerFeatures: ['आवाज़-संचालित उत्पाद सूची', 'स्मार्ट बिक्री विश्लेषण', 'आसान डिलीवरी प्रबंधन', 'रियल-टाइम ग्राहक जानकारी'],
      buyerMode: 'खरीदार मोड',
      buyerDesc: 'अपनी आवाज़ से स्मार्ट खरीदारी',
      buyerFeatures: ['आवाज़ खोज और खोज', 'स्मार्ट कार्ट प्रबंधन', 'सीधा विक्रेता संपर्क', 'निर्बाध ऑर्डर ट्रैकिंग'],
      getStarted: 'अपनी यात्रा शुरू करें',
      voicePowered: 'आवाज़-संचालित अनुभव',
      aiDriven: 'AI-संचालित बाज़ार'
    },
    'मराठी': {
      title: 'तुमचा प्रवास निवडा',
      subtitle: 'आज तुम्ही VocalKart चा अनुभव कसा घ्यायचा आहे?',
      sellerMode: 'विक्रेता मोड',
      sellerDesc: 'आवाजाने तुमचा व्यवसाय बदला',
      sellerFeatures: ['आवाज-चालित उत्पादन यादी', 'स्मार्ट विक्री विश्लेषण', 'सोपे डिलिव्हरी व्यवस्थापन', 'रिअल-टाइम ग्राहक माहिती'],
      buyerMode: 'खरेदीदार मोड',
      buyerDesc: 'तुमच्या आवाजाने स्मार्ट खरेदी',
      buyerFeatures: ['आवाज शोध आणि शोध', 'स्मार्ट कार्ट व्यवस्थापन', 'थेट विक्रेता संपर्क', 'अखंड ऑर्डर ट्रॅकिंग'],
      getStarted: 'तुमचा प्रवास सुरू करा',
      voicePowered: 'आवाज-चालित अनुभव',
      aiDriven: 'AI-चालित बाजारपेठ'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = currentLanguage === 'हिंदी' ? 'hi-IN' : currentLanguage === 'मराठी' ? 'mr-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 pb-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500 animate-spin mr-2" />
          <h2 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onMouseEnter={() => speakText(t.title)}
          >
            {t.title}
          </h2>
          <Sparkles className="w-8 h-8 text-yellow-500 animate-spin ml-2" />
        </div>
        <p 
          className="text-gray-600 text-lg cursor-pointer hover:text-gray-800 transition-colors"
          onMouseEnter={() => speakText(t.subtitle)}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Seller Mode */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 card-hover">
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:animate-bounce" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                <Store className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 
                className="text-2xl font-bold text-green-800 mb-2 cursor-pointer hover:text-green-600 transition-colors"
                onMouseEnter={() => speakText(t.sellerMode)}
              >
                {t.sellerMode}
              </h3>
              <p 
                className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
                onMouseEnter={() => speakText(t.sellerDesc)}
              >
                {t.sellerDesc}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {t.sellerFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 group/item cursor-pointer hover:bg-green-50 p-2 rounded-lg transition-all duration-300"
                  onMouseEnter={() => speakText(feature)}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm group-hover/item:text-green-800 transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onModeSelect('seller')}
              className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform group-hover:animate-pulse"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
              onMouseEnter={() => speakText(t.getStarted)}
            >
              <span className="flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                {t.getStarted}
              </span>
            </button>
          </div>
        </div>

        {/* Buyer Mode */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 card-hover">
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:animate-bounce" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}>
                <ShoppingCart className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 
                className="text-2xl font-bold text-blue-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                onMouseEnter={() => speakText(t.buyerMode)}
              >
                {t.buyerMode}
              </h3>
              <p 
                className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
                onMouseEnter={() => speakText(t.buyerDesc)}
              >
                {t.buyerDesc}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {t.buyerFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 group/item cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-300"
                  onMouseEnter={() => speakText(feature)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm group-hover/item:text-blue-800 transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onModeSelect('buyer')}
              className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform group-hover:animate-pulse"
              style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}
              onMouseEnter={() => speakText(t.getStarted)}
            >
              <span className="flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.getStarted}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-8 border-2 border-amber-200 shadow-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 
              className="text-2xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-amber-600 transition-colors"
              onMouseEnter={() => speakText(t.voicePowered)}
            >
              {t.voicePowered}
            </h3>
            <p 
              className="text-gray-600 text-lg cursor-pointer hover:text-gray-800 transition-colors"
              onMouseEnter={() => speakText(t.aiDriven)}
            >
              {t.aiDriven}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">Voice Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionScreen;
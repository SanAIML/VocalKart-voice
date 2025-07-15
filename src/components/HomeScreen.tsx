import React from 'react';
import { Mic, ShoppingCart, PlusCircle, TrendingUp, Truck, User, HelpCircle, Sparkles, Zap } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  currentLanguage: string;
  userMode: 'seller' | 'buyer' | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, currentLanguage, userMode }) => {
  const translations = {
    'English': {
      welcome: 'Welcome to VocalKart',
      tagline: 'Your AI-powered voice marketplace',
      addProducts: 'Add Products',
      addProductsSub: 'List your items with voice magic',
      buyProduct: 'Buy Products',
      buyProductSub: 'Shop with your voice assistant',
      sales: 'My Sales & Reports',
      salesSub: 'Track your earnings with AI insights',
      deliveries: 'Deliveries',
      deliveriesSub: 'Manage orders effortlessly',
      deliveryStatus: 'Delivery Status',
      deliveryStatusSub: 'Track your orders in real-time',
      profile: 'Profile & KYC',
      profileSub: 'Manage your digital identity',
      help: 'Help & Support',
      helpSub: 'Get instant AI assistance',
      sellerFeatures: 'Seller Dashboard',
      buyerFeatures: 'Buyer Dashboard',
      voicePowered: 'Voice-Powered',
      aiDriven: 'AI-Driven'
    },
    'हिंदी': {
      welcome: 'VocalKart में आपका स्वागत है',
      tagline: 'आपका AI-संचालित आवाज़ बाज़ार',
      addProducts: 'उत्पाद जोड़ें',
      addProductsSub: 'आवाज़ के जादू से अपनी वस्तुओं को सूचीबद्ध करें',
      buyProduct: 'उत्पाद खरीदें',
      buyProductSub: 'अपने आवाज़ सहायक से खरीदारी करें',
      sales: 'मेरी बिक्री और रिपोर्ट',
      salesSub: 'AI अंतर्दृष्टि के साथ अपनी कमाई को ट्रैक करें',
      deliveries: 'डिलीवरी',
      deliveriesSub: 'आसानी से ऑर्डर प्रबंधित करें',
      deliveryStatus: 'डिलीवरी स्थिति',
      deliveryStatusSub: 'रियल-टाइम में अपने ऑर्डर ट्रैक करें',
      profile: 'प्रोफ़ाइल और KYC',
      profileSub: 'अपनी डिजिटल पहचान प्रबंधित करें',
      help: 'सहायता और समर्थन',
      helpSub: 'तुरंत AI सहायता प्राप्त करें',
      sellerFeatures: 'विक्रेता डैशबोर्ड',
      buyerFeatures: 'खरीदार डैशबोर्ड',
      voicePowered: 'आवाज़-संचालित',
      aiDriven: 'AI-संचालित'
    },
    'मराठी': {
      welcome: 'VocalKart मध्ये आपले स्वागत आहे',
      tagline: 'तुमचा AI-चालित आवाज बाजारपेठ',
      addProducts: 'उत्पादने जोडा',
      addProductsSub: 'आवाजाच्या जादूने तुमच्या वस्तू सूचीबद्ध करा',
      buyProduct: 'उत्पादने खरेदी करा',
      buyProductSub: 'तुमच्या आवाज सहाय्यकाने खरेदी करा',
      sales: 'माझी विक्री आणि अहवाल',
      salesSub: 'AI अंतर्दृष्टीसह तुमची कमाई ट्रॅक करा',
      deliveries: 'डिलिव्हरी',
      deliveriesSub: 'सहजतेने ऑर्डर व्यवस्थापित करा',
      deliveryStatus: 'डिलिव्हरी स्थिती',
      deliveryStatusSub: 'रिअल-टाइममध्ये तुमचे ऑर्डर ट्रॅक करा',
      profile: 'प्रोफाइल आणि KYC',
      profileSub: 'तुमची डिजिटल ओळख व्यवस्थापित करा',
      help: 'मदत आणि समर्थन',
      helpSub: 'तत्काळ AI सहाय्य मिळवा',
      sellerFeatures: 'विक्रेता डॅशबोर्ड',
      buyerFeatures: 'खरेदीदार डॅशबोर्ड',
      voicePowered: 'आवाज-चालित',
      aiDriven: 'AI-चालित'
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

  const getMenuItems = () => {
    const baseItems = [
      {
        id: 'profile',
        title: t.profile,
        subtitle: t.profileSub,
        icon: <User className="w-8 h-8" />,
        gradient: 'from-purple-500 to-purple-700',
        bgGradient: 'from-purple-50 to-purple-100'
      },
      {
        id: 'help',
        title: t.help,
        subtitle: t.helpSub,
        icon: <HelpCircle className="w-8 h-8" />,
        gradient: 'from-orange-500 to-orange-700',
        bgGradient: 'from-orange-50 to-orange-100'
      }
    ];

    if (userMode === 'seller') {
      return [
        {
          id: 'add-product',
          title: t.addProducts,
          subtitle: t.addProductsSub,
          icon: <PlusCircle className="w-8 h-8" />,
          gradient: 'from-green-500 to-green-700',
          bgGradient: 'from-green-50 to-green-100'
        },
        {
          id: 'sales',
          title: t.sales,
          subtitle: t.salesSub,
          icon: <TrendingUp className="w-8 h-8" />,
          gradient: 'from-blue-500 to-blue-700',
          bgGradient: 'from-blue-50 to-blue-100'
        },
        {
          id: 'deliveries',
          title: t.deliveries,
          subtitle: t.deliveriesSub,
          icon: <Truck className="w-8 h-8" />,
          gradient: 'from-teal-500 to-teal-700',
          bgGradient: 'from-teal-50 to-teal-100'
        },
        ...baseItems
      ];
    } else if (userMode === 'buyer') {
      return [
        {
          id: 'buy-product',
          title: t.buyProduct,
          subtitle: t.buyProductSub,
          icon: <ShoppingCart className="w-8 h-8" />,
          gradient: 'from-blue-500 to-blue-700',
          bgGradient: 'from-blue-50 to-blue-100'
        },
        {
          id: 'delivery-status',
          title: t.deliveryStatus,
          subtitle: t.deliveryStatusSub,
          icon: <Truck className="w-8 h-8" />,
          gradient: 'from-teal-500 to-teal-700',
          bgGradient: 'from-teal-50 to-teal-100'
        },
        ...baseItems
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="space-y-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Welcome Section */}
      <div className="relative z-10 bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' }}>
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="VocalKart marketplace"
                className="w-18 h-18 rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform mb-2"
              onMouseEnter={() => speakText(t.welcome)}
            >
              {t.welcome}
            </h2>
            <p 
              className="text-gray-600 text-lg cursor-pointer hover:text-gray-800 transition-colors"
              onMouseEnter={() => speakText(t.tagline)}
            >
              {t.tagline}
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">{t.voicePowered}</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-700 font-medium">{t.aiDriven}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center space-x-3">
          <Mic className="w-6 h-6" style={{ color: '#3CAEA3' }} />
          <h3 
            className="text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
            style={{ color: '#1A1A1A' }}
            onMouseEnter={() => speakText(userMode === 'seller' ? t.sellerFeatures : userMode === 'buyer' ? t.buyerFeatures : 'Features')}
          >
            {userMode === 'seller' ? t.sellerFeatures : userMode === 'buyer' ? t.buyerFeatures : 'Features'}
          </h3>
          <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => speakText(item.title)}
              className="group relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 card-hover border border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-center space-x-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:animate-bounce bg-gradient-to-r ${item.gradient}`}>
                  {item.icon}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#1A1A1A' }}>
                    {item.title}
                  </h4>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    {item.subtitle}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                  <Mic className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:animate-pulse transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
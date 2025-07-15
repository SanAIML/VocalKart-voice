import React, { useState } from 'react';
import { Mic, ShoppingCart, PlusCircle, TrendingUp, Truck, User, HelpCircle, Package } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  currentLanguage: string;
  userMode: 'seller' | 'buyer' | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, currentLanguage, userMode }) => {
  const translations = {
    'English': {
      welcome: 'Welcome to VocalKart',
      tagline: 'Your voice-powered marketplace',
      addProducts: 'Add Products',
      addProductsSub: 'List your items with voice',
      buyProduct: 'Buy Products',
      buyProductSub: 'Shop with your voice',
      sales: 'My Sales & Reports',
      salesSub: 'Track your earnings',
      deliveries: 'Deliveries',
      deliveriesSub: 'Manage your orders',
      deliveryStatus: 'Delivery Status',
      deliveryStatusSub: 'Track your orders',
      profile: 'Profile & KYC',
      profileSub: 'Manage your account',
      help: 'Help & Support',
      helpSub: 'Get assistance',
      sellerFeatures: 'Seller Features',
      buyerFeatures: 'Buyer Features'
    },
    'हिंदी': {
      welcome: 'VocalKart में आपका स्वागत है',
      tagline: 'आपका आवाज़-संचालित बाज़ार',
      addProducts: 'उत्पाद जोड़ें',
      addProductsSub: 'अपनी वस्तुओं को आवाज़ से सूचीबद्ध करें',
      buyProduct: 'उत्पाद खरीदें',
      buyProductSub: 'अपनी आवाज़ से खरीदारी करें',
      sales: 'मेरी बिक्री और रिपोर्ट',
      salesSub: 'अपनी कमाई को ट्रैक करें',
      deliveries: 'डिलीवरी',
      deliveriesSub: 'अपने ऑर्डर प्रबंधित करें',
      deliveryStatus: 'डिलीवरी स्थिति',
      deliveryStatusSub: 'अपने ऑर्डर ट्रैक करें',
      profile: 'प्रोफ़ाइल और KYC',
      profileSub: 'अपना खाता प्रबंधित करें',
      help: 'सहायता और समर्थन',
      helpSub: 'सहायता प्राप्त करें',
      sellerFeatures: 'विक्रेता सुविधाएं',
      buyerFeatures: 'खरीदार सुविधाएं'
    },
    'मराठी': {
      welcome: 'VocalKart मध्ये आपले स्वागत आहे',
      tagline: 'तुमचा आवाज-चालित बाजारपेठ',
      addProducts: 'उत्पादने जोडा',
      addProductsSub: 'तुमच्या वस्तू आवाजाने सूचीबद्ध करा',
      buyProduct: 'उत्पादने खरेदी करा',
      buyProductSub: 'तुमच्या आवाजाने खरेदी करा',
      sales: 'माझी विक्री आणि अहवाल',
      salesSub: 'तुमची कमाई ट्रॅक करा',
      deliveries: 'डिलिव्हरी',
      deliveriesSub: 'तुमचे ऑर्डर व्यवस्थापित करा',
      deliveryStatus: 'डिलिव्हरी स्थिती',
      deliveryStatusSub: 'तुमचे ऑर्डर ट्रॅक करा',
      profile: 'प्रोफाइल आणि KYC',
      profileSub: 'तुमचे खाते व्यवस्थापित करा',
      help: 'मदत आणि समर्थन',
      helpSub: 'सहाय्य मिळवा',
      sellerFeatures: 'विक्रेता वैशिष्ट्ये',
      buyerFeatures: 'खरेदीदार वैशिष्ट्ये'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
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
        color: '#20639B'
      },
      {
        id: 'help',
        title: t.help,
        subtitle: t.helpSub,
        icon: <HelpCircle className="w-8 h-8" />,
        color: '#3CAEA3'
      }
    ];

    if (userMode === 'seller') {
      return [
        {
          id: 'add-product',
          title: t.addProducts,
          subtitle: t.addProductsSub,
          icon: <PlusCircle className="w-8 h-8" />,
          color: '#3CAEA3'
        },
        {
          id: 'sales',
          title: t.sales,
          subtitle: t.salesSub,
          icon: <TrendingUp className="w-8 h-8" />,
          color: '#20639B'
        },
        {
          id: 'deliveries',
          title: t.deliveries,
          subtitle: t.deliveriesSub,
          icon: <Truck className="w-8 h-8" />,
          color: '#3CAEA3'
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
          color: '#20639B'
        },
        {
          id: 'delivery-status',
          title: t.deliveryStatus,
          subtitle: t.deliveryStatusSub,
          icon: <Truck className="w-8 h-8" />,
          color: '#3CAEA3'
        },
        ...baseItems
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#20639B' }}>
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="VocalKart marketplace"
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 
              className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: '#1A1A1A' }}
              onMouseEnter={() => speakText(t.welcome)}
            >
              {t.welcome}
            </h2>
            <p 
              className="text-gray-600 cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={() => speakText(t.tagline)}
            >
              {t.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="space-y-4">
        <h3 
          className="text-xl font-semibold flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ color: '#1A1A1A' }}
          onMouseEnter={() => speakText(userMode === 'seller' ? t.sellerFeatures : userMode === 'buyer' ? t.buyerFeatures : 'Features')}
        >
          <Mic className="w-5 h-5 mr-2" style={{ color: '#3CAEA3' }} />
          {userMode === 'seller' ? t.sellerFeatures : userMode === 'buyer' ? t.buyerFeatures : 'Features'}
        </h3>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => speakText(item.title)}
            className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Mic className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
import React, { useState } from 'react';
import { Mic, ShoppingCart, PlusCircle, TrendingUp, Truck, User, Camera, Headphones, HelpCircle, Package, ChevronDown } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  currentLanguage: string;
  userMode: 'seller' | 'buyer' | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, currentLanguage, userMode }) => {
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  const translations = {
    'English': {
      welcome: 'Welcome to VocalKart',
      tagline: 'Your voice-powered marketplace',
      itemsListed: 'Items Listed',
      ordersToday: 'Orders Today',
      voiceFeatures: 'Voice Features',
      addProduct: 'Add Product by Voice',
      addProductSub: 'Speak to list your items',
      buyProduct: 'Buy Product via Voice',
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
      featuredProducts: 'Featured Products',
      freshVegetables: 'Fresh Vegetables',
      freshFruits: 'Fresh Fruits',
      sellerFeatures: 'Seller Features',
      buyerFeatures: 'Buyer Features',
      itemsListedPage: 'Items Listed',
      itemsListedPageSub: 'View all your products',
      viewAllItems: 'View All Items',
      myProducts: 'My Products'
    },
    'हिंदी': {
      welcome: 'VocalKart में आपका स्वागत है',
      tagline: 'आपका आवाज़-संचालित बाज़ार',
      itemsListed: 'सूचीबद्ध वस्तुएं',
      ordersToday: 'आज के ऑर्डर',
      voiceFeatures: 'आवाज़ की सुविधाएं',
      addProduct: 'आवाज़ से उत्पाद जोड़ें',
      addProductSub: 'अपनी वस्तुओं को सूचीबद्ध करने के लिए बोलें',
      buyProduct: 'आवाज़ से उत्पाद खरीदें',
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
      featuredProducts: 'विशेष उत्पाद',
      freshVegetables: 'ताज़ी सब्जियां',
      freshFruits: 'ताज़े फल',
      sellerFeatures: 'विक्रेता सुविधाएं',
      buyerFeatures: 'खरीदार सुविधाएं',
      itemsListedPage: 'सूचीबद्ध वस्तुएं',
      itemsListedPageSub: 'अपने सभी उत्पाद देखें',
      viewAllItems: 'सभी वस्तुएं देखें',
      myProducts: 'मेरे उत्पाद'
    },
    'मराठी': {
      welcome: 'VocalKart मध्ये आपले स्वागत आहे',
      tagline: 'तुमचा आवाज-चालित बाजारपेठ',
      itemsListed: 'सूचीबद्ध वस्तू',
      ordersToday: 'आजचे ऑर्डर',
      voiceFeatures: 'आवाजाची वैशिष्ट्ये',
      addProduct: 'आवाजाने उत्पादन जोडा',
      addProductSub: 'तुमच्या वस्तू सूचीबद्ध करण्यासाठी बोला',
      buyProduct: 'आवाजाने उत्पादन खरेदी करा',
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
      featuredProducts: 'वैशिष्ट्यीकृत उत्पादने',
      freshVegetables: 'ताज्या भाज्या',
      freshFruits: 'ताजी फळे',
      sellerFeatures: 'विक्रेता वैशिष्ट्ये',
      buyerFeatures: 'खरेदीदार वैशिष्ट्ये',
      itemsListedPage: 'सूचीबद्ध वस्तू',
      itemsListedPageSub: 'तुमची सर्व उत्पादने पहा',
      viewAllItems: 'सर्व वस्तू पहा',
      myProducts: 'माझी उत्पादने'
    },
    'தமிழ்': {
      welcome: 'VocalKart இல் உங்களை வரவேற்கிறோம்',
      tagline: 'உங்கள் குரல்-இயங்கும் சந்தை',
      itemsListed: 'பட்டியலிடப்பட்ட பொருட்கள்',
      ordersToday: 'இன்றைய ஆர்டர்கள்',
      voiceFeatures: 'குரல் அம்சங்கள்',
      addProduct: 'குரல் மூலம் தயாரிப்பு சேர்க்கவும்',
      addProductSub: 'உங்கள் பொருட்களை பட்டியலிட பேசுங்கள்',
      buyProduct: 'குரல் மூலம் தயாரிப்பு வாங்கவும்',
      buyProductSub: 'உங்கள் குரலால் வாங்குங்கள்',
      sales: 'எனது விற்பனை மற்றும் அறிக்கைகள்',
      salesSub: 'உங்கள் வருமானத்தை கண்காணிக்கவும்',
      deliveries: 'டெலிவரிகள்',
      deliveriesSub: 'உங்கள் ஆர்டர்களை நிர்வகிக்கவும்',
      deliveryStatus: 'டெலிவரி நிலை',
      deliveryStatusSub: 'உங்கள் ஆர்டர்களை கண்காணிக்கவும்',
      profile: 'சுயவிவரம் மற்றும் KYC',
      profileSub: 'உங்கள் கணக்கை நிர்வகிக்கவும்',
      help: 'உதவி மற்றும் ஆதரவு',
      helpSub: 'உதவி பெறுங்கள்',
      featuredProducts: 'சிறப்பு தயாரிப்புகள்',
      freshVegetables: 'புதிய காய்கறிகள்',
      freshFruits: 'புதிய பழங்கள்',
      sellerFeatures: 'விற்பனையாளர் அம்சங்கள்',
      buyerFeatures: 'வாங்குபவர் அம்சங்கள்',
      itemsListedPage: 'பட்டியலிடப்பட்ட பொருட்கள்',
      itemsListedPageSub: 'உங்கள் அனைத்து தயாரிப்புகளையும் பார்க்கவும்',
      viewAllItems: 'அனைத்து பொருட்களையும் பார்க்கவும்',
      myProducts: 'எனது தயாரிப்புகள்'
    },
    'తెలుగు': {
      welcome: 'VocalKart కు స్వాగతం',
      tagline: 'మీ వాయిస్-పవర్డ్ మార్కెట్‌ప్లేస్',
      itemsListed: 'జాబితా చేయబడిన వస్తువులు',
      ordersToday: 'నేటి ఆర్డర్లు',
      voiceFeatures: 'వాయిస్ ఫీచర్లు',
      addProduct: 'వాయిస్ ద్వారా ఉత్పత్తిని జోడించండి',
      addProductSub: 'మీ వస్తువులను జాబితా చేయడానికి మాట్లాడండి',
      buyProduct: 'వాయిస్ ద్వారా ఉత్పత్తిని కొనుగోలు చేయండి',
      buyProductSub: 'మీ వాయిస్‌తో షాపింగ్ చేయండి',
      sales: 'నా అమ్మకాలు మరియు నివేదికలు',
      salesSub: 'మీ ఆదాయాలను ట్రాక్ చేయండి',
      deliveries: 'డెలివరీలు',
      deliveriesSub: 'మీ ఆర్డర్లను నిర్వహించండి',
      deliveryStatus: 'డెలివరీ స్థితి',
      deliveryStatusSub: 'మీ ఆర్డర్లను ట్రాక్ చేయండి',
      profile: 'ప్రొఫైల్ మరియు KYC',
      profileSub: 'మీ ఖాతాను నిర్వహించండి',
      help: 'సహాయం మరియు మద్దతు',
      helpSub: 'సహాయం పొందండి',
      featuredProducts: 'ఫీచర్డ్ ఉత్పత్తులు',
      freshVegetables: 'తాజా కూరగాయలు',
      freshFruits: 'తాజా పండ్లు',
      sellerFeatures: 'విక్రేత ఫీచర్లు',
      buyerFeatures: 'కొనుగోలుదారు ఫీచర్లు',
      itemsListedPage: 'జాబితా చేయబడిన వస్తువులు',
      itemsListedPageSub: 'మీ అన్ని ఉత్పత్తులను చూడండి',
      viewAllItems: 'అన్ని వస్తువులను చూడండి',
      myProducts: 'నా ఉత్పత్తులు'
    },
    'ಕನ್ನಡ': {
      welcome: 'VocalKart ಗೆ ಸ್ವಾಗತ',
      tagline: 'ನಿಮ್ಮ ಧ್ವನಿ-ಚಾಲಿತ ಮಾರುಕಟ್ಟೆ',
      itemsListed: 'ಪಟ್ಟಿ ಮಾಡಿದ ವಸ್ತುಗಳು',
      ordersToday: 'ಇಂದಿನ ಆರ್ಡರ್‌ಗಳು',
      voiceFeatures: 'ಧ್ವನಿ ವೈಶಿಷ್ಟ್ಯಗಳು',
      addProduct: 'ಧ್ವನಿಯ ಮೂಲಕ ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಿ',
      addProductSub: 'ನಿಮ್ಮ ವಸ್ತುಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಲು ಮಾತನಾಡಿ',
      buyProduct: 'ಧ್ವನಿಯ ಮೂಲಕ ಉತ್ಪನ್ನವನ್ನು ಖರೀದಿಸಿ',
      buyProductSub: 'ನಿಮ್ಮ ಧ್ವನಿಯೊಂದಿಗೆ ಶಾಪಿಂಗ್ ಮಾಡಿ',
      sales: 'ನನ್ನ ಮಾರಾಟ ಮತ್ತು ವರದಿಗಳು',
      salesSub: 'ನಿಮ್ಮ ಗಳಿಕೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      deliveries: 'ಡೆಲಿವರಿಗಳು',
      deliveriesSub: 'ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
      deliveryStatus: 'ಡೆಲಿವರಿ ಸ್ಥಿತಿ',
      deliveryStatusSub: 'ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      profile: 'ಪ್ರೊಫೈಲ್ ಮತ್ತು KYC',
      profileSub: 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಿ',
      help: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',
      helpSub: 'ಸಹಾಯ ಪಡೆಯಿರಿ',
      featuredProducts: 'ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಉತ್ಪನ್ನಗಳು',
      freshVegetables: 'ತಾಜಾ ತರಕಾರಿಗಳು',
      freshFruits: 'ತಾಜಾ ಹಣ್ಣುಗಳು',
      sellerFeatures: 'ಮಾರಾಟಗಾರ ವೈಶಿಷ್ಟ್ಯಗಳು',
      buyerFeatures: 'ಖರೀದಿದಾರ ವೈಶಿಷ್ಟ್ಯಗಳು',
      itemsListedPage: 'ಪಟ್ಟಿ ಮಾಡಿದ ವಸ್ತುಗಳು',
      itemsListedPageSub: 'ನಿಮ್ಮ ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      viewAllItems: 'ಎಲ್ಲಾ ವಸ್ತುಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      myProducts: 'ನನ್ನ ಉತ್ಪನ್ನಗಳು'
    },
    'বাংলা': {
      welcome: 'VocalKart এ স্বাগতম',
      tagline: 'আপনার ভয়েস-চালিত মার্কেটপ্লেস',
      itemsListed: 'তালিকাভুক্ত আইটেম',
      ordersToday: 'আজকের অর্ডার',
      voiceFeatures: 'ভয়েস ফিচার',
      addProduct: 'ভয়েস দিয়ে পণ্য যোগ করুন',
      addProductSub: 'আপনার আইটেম তালিকাভুক্ত করতে কথা বলুন',
      buyProduct: 'ভয়েস দিয়ে পণ্য কিনুন',
      buyProductSub: 'আপনার ভয়েস দিয়ে কেনাকাটা করুন',
      sales: 'আমার বিক্রয় এবং রিপোর্ট',
      salesSub: 'আপনার আয় ট্র্যাক করুন',
      deliveries: 'ডেলিভারি',
      deliveriesSub: 'আপনার অর্ডার পরিচালনা করুন',
      deliveryStatus: 'ডেলিভারি স্ট্যাটাস',
      deliveryStatusSub: 'আপনার অর্ডার ট্র্যাক করুন',
      profile: 'প্রোফাইল এবং KYC',
      profileSub: 'আপনার অ্যাকাউন্ট পরিচালনা করুন',
      help: 'সাহায্য এবং সহায়তা',
      helpSub: 'সহায়তা পান',
      featuredProducts: 'বৈশিষ্ট্যযুক্ত পণ্য',
      freshVegetables: 'তাজা সবজি',
      freshFruits: 'তাজা ফল',
      sellerFeatures: 'বিক্রেতা বৈশিষ্ট্য',
      buyerFeatures: 'ক্রেতা বৈশিষ্ট্য',
      itemsListedPage: 'তালিকাভুক্ত আইটেম',
      itemsListedPageSub: 'আপনার সব পণ্য দেখুন',
      viewAllItems: 'সব আইটেম দেখুন',
      myProducts: 'আমার পণ্য'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  // Sample products for dropdown
  const myProducts = [
    { id: 1, name: 'Fresh Onions', price: 30, stock: 15 },
    { id: 2, name: 'Organic Tomatoes', price: 40, stock: 8 },
    { id: 3, name: 'Sweet Mangoes', price: 80, stock: 0 },
    { id: 4, name: 'Fresh Potatoes', price: 25, stock: 18 }
  ];

  const getMenuItems = () => {
    const baseItems = [
      {
        id: 'profile',
        title: t.profile,
        subtitle: t.profileSub,
        icon: <User className="w-8 h-8" />,
        color: 'from-indigo-400 to-indigo-600',
        textColor: 'text-indigo-800'
      },
      {
        id: 'help',
        title: t.help,
        subtitle: t.helpSub,
        icon: <HelpCircle className="w-8 h-8" />,
        color: 'from-pink-400 to-pink-600',
        textColor: 'text-pink-800'
      }
    ];

    if (userMode === 'seller') {
      return [
        {
          id: 'add-product',
          title: t.addProduct,
          subtitle: t.addProductSub,
          icon: <Mic className="w-8 h-8" />,
          color: 'from-green-400 to-green-600',
          textColor: 'text-green-800'
        },
        {
          id: 'sales',
          title: t.sales,
          subtitle: t.salesSub,
          icon: <TrendingUp className="w-8 h-8" />,
          color: 'from-purple-400 to-purple-600',
          textColor: 'text-purple-800'
        },
        {
          id: 'deliveries',
          title: t.deliveries,
          subtitle: t.deliveriesSub,
          icon: <Truck className="w-8 h-8" />,
          color: 'from-orange-400 to-orange-600',
          textColor: 'text-orange-800'
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
          color: 'from-blue-400 to-blue-600',
          textColor: 'text-blue-800'
        },
        {
          id: 'delivery-status',
          title: t.deliveryStatus,
          subtitle: t.deliveryStatusSub,
          icon: <Truck className="w-8 h-8" />,
          color: 'from-orange-400 to-orange-600',
          textColor: 'text-orange-800'
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="VocalKart marketplace"
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.welcome}</h2>
            <p className="text-gray-600">{t.tagline}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{userMode === 'seller' ? t.itemsListed : t.ordersToday}</p>
              <p className="text-2xl font-bold text-green-600">{userMode === 'seller' ? '12' : '3'}</p>
            </div>
            {userMode === 'seller' ? <PlusCircle className="w-8 h-8 text-green-500" /> : <ShoppingCart className="w-8 h-8 text-green-500" />}
          </div>
        </div>
        
        {/* Items Listed Dropdown for Sellers */}
        {userMode === 'seller' ? (
          <div className="relative">
            <button
              onClick={() => setShowItemsDropdown(!showItemsDropdown)}
              className="w-full bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 text-left hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.myProducts}</p>
                  <p className="text-2xl font-bold text-blue-600">{myProducts.length}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-8 h-8 text-blue-500" />
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showItemsDropdown ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showItemsDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border-2 border-blue-100 z-50 max-h-64 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{t.myProducts}</h4>
                    <button
                      onClick={() => onNavigate('items-listed')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t.viewAllItems}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {myProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-600">₹{product.price}/kg</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} kg` : 'Out of Stock'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.itemsListed}</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <PlusCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        )}
      </div>

      {/* Main Menu */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Headphones className="w-5 h-5 mr-2" />
          {userMode === 'seller' ? t.sellerFeatures : userMode === 'buyer' ? t.buyerFeatures : t.voiceFeatures}
        </h3>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100 hover:border-orange-300 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <h4 className={`text-lg font-semibold ${item.textColor}`}>{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Mic className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.featuredProducts}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
            <img
              src="https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Fresh vegetables"
              className="w-full h-24 object-cover rounded-lg mb-2"
            />
            <p className="text-sm font-medium text-gray-800">{t.freshVegetables}</p>
            <p className="text-xs text-gray-600">₹30-50/kg</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
            <img
              src="https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Fresh fruits"
              className="w-full h-24 object-cover rounded-lg mb-2"
            />
            <p className="text-sm font-medium text-gray-800">{t.freshFruits}</p>
            <p className="text-xs text-gray-600">₹40-80/kg</p>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {showItemsDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowItemsDropdown(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;
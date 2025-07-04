import React from 'react';
import { ShoppingCart, Store, Users, TrendingUp } from 'lucide-react';

interface ModeSelectionScreenProps {
  onModeSelect: (mode: 'seller' | 'buyer') => void;
  currentLanguage: string;
}

const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onModeSelect, currentLanguage }) => {
  const translations = {
    'English': {
      title: 'Choose Your Mode',
      subtitle: 'How would you like to use VocalKart today?',
      sellerMode: 'Seller Mode',
      sellerDesc: 'List and sell your products',
      sellerFeatures: ['Add products by voice', 'Track sales & analytics', 'Manage deliveries', 'View customer orders'],
      buyerMode: 'Buyer Mode',
      buyerDesc: 'Shop for products nearby',
      buyerFeatures: ['Search products by voice', 'Add items to cart', 'Call vendors directly', 'Track your orders'],
      getStarted: 'Get Started'
    },
    'हिंदी': {
      title: 'अपना मोड चुनें',
      subtitle: 'आज आप VocalKart का उपयोग कैसे करना चाहते हैं?',
      sellerMode: 'विक्रेता मोड',
      sellerDesc: 'अपने उत्पादों को सूचीबद्ध करें और बेचें',
      sellerFeatures: ['आवाज़ से उत्पाद जोड़ें', 'बिक्री और विश्लेषण ट्रैक करें', 'डिलीवरी प्रबंधित करें', 'ग्राहक ऑर्डर देखें'],
      buyerMode: 'खरीदार मोड',
      buyerDesc: 'आस-पास के उत्पादों की खरीदारी करें',
      buyerFeatures: ['आवाज़ से उत्पाद खोजें', 'कार्ट में आइटम जोड़ें', 'विक्रेताओं को सीधे कॉल करें', 'अपने ऑर्डर ट्रैक करें'],
      getStarted: 'शुरू करें'
    },
    'मराठी': {
      title: 'तुमचा मोड निवडा',
      subtitle: 'आज तुम्ही VocalKart चा वापर कसा करू इच्छिता?',
      sellerMode: 'विक्रेता मोड',
      sellerDesc: 'तुमची उत्पादने सूचीबद्ध करा आणि विका',
      sellerFeatures: ['आवाजाने उत्पादन जोडा', 'विक्री आणि विश्लेषण ट्रॅक करा', 'डिलिव्हरी व्यवस्थापित करा', 'ग्राहक ऑर्डर पहा'],
      buyerMode: 'खरेदीदार मोड',
      buyerDesc: 'जवळपासची उत्पादने खरेदी करा',
      buyerFeatures: ['आवाजाने उत्पादन शोधा', 'कार्टमध्ये आयटम जोडा', 'विक्रेत्यांना थेट कॉल करा', 'तुमचे ऑर्डर ट्रॅक करा'],
      getStarted: 'सुरुवात करा'
    },
    'தமிழ்': {
      title: 'உங்கள் பயன்முறையைத் தேர்ந்தெடுக்கவும்',
      subtitle: 'இன்று நீங்கள் VocalKart ஐ எப்படி பயன்படுத்த விரும்புகிறீர்கள்?',
      sellerMode: 'விற்பனையாளர் பயன்முறை',
      sellerDesc: 'உங்கள் தயாரிப்புகளை பட்டியலிட்டு விற்கவும்',
      sellerFeatures: ['குரல் மூலம் தயாரிப்புகளை சேர்க்கவும்', 'விற்பனை மற்றும் பகுப்பாய்வு கண்காணிக்கவும்', 'டெலிவரிகளை நிர்வகிக்கவும்', 'வாடிக்கையாளர் ஆர்டர்களை பார்க்கவும்'],
      buyerMode: 'வாங்குபவர் பயன்முறை',
      buyerDesc: 'அருகிலுள்ள தயாரிப்புகளை வாங்கவும்',
      buyerFeatures: ['குரல் மூலம் தயாரிப்புகளை தேடவும்', 'கார்ட்டில் பொருட்களை சேர்க்கவும்', 'விற்பனையாளர்களை நேரடியாக அழைக்கவும்', 'உங்கள் ஆர்டர்களை கண்காணிக்கவும்'],
      getStarted: 'தொடங்குங்கள்'
    },
    'తెలుగు': {
      title: 'మీ మోడ్‌ను ఎంచుకోండి',
      subtitle: 'ఈరోజు మీరు VocalKart ను ఎలా ఉపయోగించాలని అనుకుంటున్నారు?',
      sellerMode: 'విక్రేత మోడ్',
      sellerDesc: 'మీ ఉత్పత్తులను జాబితా చేసి అమ్మండి',
      sellerFeatures: ['వాయిస్ ద్వారా ఉత్పత్తులను జోడించండి', 'అమ్మకాలు మరియు విశ్లేషణలను ట్రాక్ చేయండి', 'డెలివరీలను నిర్వహించండి', 'కస్టమర్ ఆర్డర్లను చూడండి'],
      buyerMode: 'కొనుగోలుదారు మోడ్',
      buyerDesc: 'సమీపంలోని ఉత్పత్తుల కోసం షాపింగ్ చేయండి',
      buyerFeatures: ['వాయిస్ ద్వారా ఉత్పత్తులను వెతకండి', 'కార్ట్‌కు వస్తువులను జోడించండి', 'విక్రేతలను నేరుగా కాల్ చేయండి', 'మీ ఆర్డర్లను ట్రాక్ చేయండి'],
      getStarted: 'ప్రారంభించండి'
    },
    'ಕನ್ನಡ': {
      title: 'ನಿಮ್ಮ ಮೋಡ್ ಆಯ್ಕೆಮಾಡಿ',
      subtitle: 'ಇಂದು ನೀವು VocalKart ಅನ್ನು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ?',
      sellerMode: 'ಮಾರಾಟಗಾರ ಮೋಡ್',
      sellerDesc: 'ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ ಮತ್ತು ಮಾರಾಟ ಮಾಡಿ',
      sellerFeatures: ['ಧ್ವನಿಯ ಮೂಲಕ ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಿ', 'ಮಾರಾಟ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', 'ಡೆಲಿವರಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ', 'ಗ್ರಾಹಕ ಆರ್ಡರ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ'],
      buyerMode: 'ಖರೀದಿದಾರ ಮೋಡ್',
      buyerDesc: 'ಹತ್ತಿರದ ಉತ್ಪನ್ನಗಳಿಗಾಗಿ ಶಾಪಿಂಗ್ ಮಾಡಿ',
      buyerFeatures: ['ಧ್ವನಿಯ ಮೂಲಕ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ', 'ಕಾರ್ಟ್‌ಗೆ ಐಟಂಗಳನ್ನು ಸೇರಿಸಿ', 'ಮಾರಾಟಗಾರರನ್ನು ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ', 'ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ'],
      getStarted: 'ಪ್ರಾರಂಭಿಸಿ'
    },
    'বাংলা': {
      title: 'আপনার মোড নির্বাচন করুন',
      subtitle: 'আজ আপনি VocalKart কীভাবে ব্যবহার করতে চান?',
      sellerMode: 'বিক্রেতা মোড',
      sellerDesc: 'আপনার পণ্য তালিকাভুক্ত করুন এবং বিক্রি করুন',
      sellerFeatures: ['ভয়েস দিয়ে পণ্য যোগ করুন', 'বিক্রয় এবং বিশ্লেষণ ট্র্যাক করুন', 'ডেলিভারি পরিচালনা করুন', 'গ্রাহক অর্ডার দেখুন'],
      buyerMode: 'ক্রেতা মোড',
      buyerDesc: 'কাছাকাছি পণ্যের জন্য কেনাকাটা করুন',
      buyerFeatures: ['ভয়েস দিয়ে পণ্য খুঁজুন', 'কার্টে আইটেম যোগ করুন', 'বিক্রেতাদের সরাসরি কল করুন', 'আপনার অর্ডার ট্র্যাক করুন'],
      getStarted: 'শুরু করুন'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seller Mode */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200 hover:border-green-400 transition-all duration-200 hover:shadow-xl">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">{t.sellerMode}</h3>
            <p className="text-gray-600">{t.sellerDesc}</p>
          </div>

          <div className="space-y-3 mb-8">
            {t.sellerFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onModeSelect('seller')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t.getStarted}
          </button>
        </div>

        {/* Buyer Mode */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 hover:shadow-xl">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">{t.buyerMode}</h3>
            <p className="text-gray-600">{t.buyerDesc}</p>
          </div>

          <div className="space-y-3 mb-8">
            {t.buyerFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onModeSelect('buyer')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t.getStarted}
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Voice-First Experience</h3>
          <p className="text-gray-600 text-sm">
            Both modes are powered by advanced voice technology, making it easy for everyone to use - regardless of literacy level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionScreen;
import React, { useState, useEffect } from 'react';
import { User, Phone, Lock, Eye, EyeOff, ShoppingCart, Mic, Volume2, Bot } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface LoginScreenProps {
  onLogin: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, currentLanguage, onLanguageChange }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceField, setVoiceField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    village: '',
    shopType: ''
  });

  const translations = {
    'English': {
      title: 'VocalKart',
      subtitle: 'Voice-First Rural Marketplace',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      village: 'Village',
      shopType: 'Shop Type',
      createAccount: 'Create Account',
      localHelperLogin: 'LocalHelper Login',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      voiceAssistant: 'AI Sign-in Assistant',
      tapToSpeak: 'Tap to speak your details',
      listening: 'Listening...',
      selectShopType: 'Select shop type',
      vegetableVendor: 'Vegetable Vendor',
      fruitSeller: 'Fruit Seller',
      groceryStore: 'Grocery Store',
      dairyProducts: 'Dairy Products',
      grainsPulses: 'Grains & Pulses',
      other: 'Other'
    },
    'हिंदी': {
      title: 'VocalKart',
      subtitle: 'आवाज़-प्रथम ग्रामीण बाज़ार',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      fullName: 'पूरा नाम',
      phoneNumber: 'फ़ोन नंबर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      village: 'गांव',
      shopType: 'दुकान का प्रकार',
      createAccount: 'खाता बनाएं',
      localHelperLogin: 'स्थानीय सहायक लॉगिन',
      alreadyHaveAccount: 'पहले से खाता है?',
      dontHaveAccount: 'खाता नहीं है?',
      voiceAssistant: 'AI साइन-इन सहायक',
      tapToSpeak: 'अपनी जानकारी बोलने के लिए टैप करें',
      listening: 'सुन रहा हूं...',
      selectShopType: 'दुकान का प्रकार चुनें',
      vegetableVendor: 'सब्जी विक्रेता',
      fruitSeller: 'फल विक्रेता',
      groceryStore: 'किराना दुकान',
      dairyProducts: 'डेयरी उत्पाद',
      grainsPulses: 'अनाज और दाल',
      other: 'अन्य'
    },
    'मराठी': {
      title: 'VocalKart',
      subtitle: 'आवाज-प्रथम ग्रामीण बाजारपेठ',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      fullName: 'पूर्ण नाव',
      phoneNumber: 'फोन नंबर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्डची पुष्टी करा',
      village: 'गाव',
      shopType: 'दुकानाचा प्रकार',
      createAccount: 'खाते तयार करा',
      localHelperLogin: 'स्थानिक मदतनीस लॉगिन',
      alreadyHaveAccount: 'आधीच खाते आहे?',
      dontHaveAccount: 'खाते नाही?',
      voiceAssistant: 'AI साइन-इन सहाय्यक',
      tapToSpeak: 'तुमची माहिती बोलण्यासाठी टॅप करा',
      listening: 'ऐकत आहे...',
      selectShopType: 'दुकानाचा प्रकार निवडा',
      vegetableVendor: 'भाजी विक्रेता',
      fruitSeller: 'फळ विक्रेता',
      groceryStore: 'किराणा दुकान',
      dairyProducts: 'दुग्धजन्य पदार्थ',
      grainsPulses: 'धान्य आणि डाळी',
      other: 'इतर'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVoiceInput = (field: string) => {
    setIsListening(true);
    setVoiceField(field);
    
    // Simulate voice input
    setTimeout(() => {
      const sampleData: { [key: string]: string } = {
        name: 'Ramesh Kumar',
        phone: '9876543210',
        village: 'Sultanpur',
        shopType: 'vegetable'
      };
      
      if (sampleData[field]) {
        handleInputChange(field, sampleData[field]);
      }
      
      setIsListening(false);
      setVoiceField(null);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F2F4F7' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-center flex-1">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#20639B' }}>
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
        </div>

        {/* AI Voice Assistant */}
        <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#F2F4F7' }}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3CAEA3' }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: '#1A1A1A' }}>{t.voiceAssistant}</h3>
              <p className="text-sm text-gray-600">{t.tapToSpeak}</p>
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              !isSignUp 
                ? 'text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ backgroundColor: !isSignUp ? '#20639B' : 'transparent' }}
          >
            {t.signIn}
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              isSignUp 
                ? 'text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ backgroundColor: isSignUp ? '#20639B' : 'transparent' }}
          >
            {t.signUp}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.fullName}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#3CAEA3' }}
                    placeholder="Enter your full name"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('name')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                    style={{ color: '#3CAEA3' }}
                  >
                    {isListening && voiceField === 'name' ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#3CAEA3' }}></div>
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.village}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#3CAEA3' }}
                    placeholder="Enter your village name"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('village')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                    style={{ color: '#3CAEA3' }}
                  >
                    {isListening && voiceField === 'village' ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#3CAEA3' }}></div>
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.shopType}</label>
                <div className="relative">
                  <select
                    value={formData.shopType}
                    onChange={(e) => handleInputChange('shopType', e.target.value)}
                    className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent appearance-none"
                    style={{ focusRingColor: '#3CAEA3' }}
                    required
                  >
                    <option value="">{t.selectShopType}</option>
                    <option value="vegetable">{t.vegetableVendor}</option>
                    <option value="fruit">{t.fruitSeller}</option>
                    <option value="grocery">{t.groceryStore}</option>
                    <option value="dairy">{t.dairyProducts}</option>
                    <option value="grains">{t.grainsPulses}</option>
                    <option value="other">{t.other}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('shopType')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                    style={{ color: '#3CAEA3' }}
                  >
                    {isListening && voiceField === 'shopType' ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#3CAEA3' }}></div>
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.phoneNumber}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="+91 9876543210"
                required
              />
              <button
                type="button"
                onClick={() => handleVoiceInput('phone')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                style={{ color: '#3CAEA3' }}
              >
                {isListening && voiceField === 'phone' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#3CAEA3' }}></div>
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.password}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.confirmPassword}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                  style={{ focusRingColor: '#3CAEA3' }}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#20639B' }}
          >
            {isSignUp ? t.createAccount : t.signIn}
          </button>

          {/* LocalHelper Login Button */}
          <button
            type="button"
            className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#3CAEA3' }}
          >
            {t.localHelperLogin}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium hover:opacity-80"
              style={{ color: '#20639B' }}
            >
              {isSignUp ? t.signIn : t.signUp}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
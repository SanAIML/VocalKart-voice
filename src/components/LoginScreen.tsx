import React, { useState, useEffect } from 'react';
import { User, Phone, Lock, Eye, EyeOff, ShoppingCart, Mic, Volume2, Bot, Sparkles, MicOff } from 'lucide-react';
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
  const [recognition, setRecognition] = useState<any>(null);
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
      other: 'Other',
      speakNow: 'Speak now...',
      voiceNotSupported: 'Voice input not supported in this browser'
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
      other: 'अन्य',
      speakNow: 'अब बोलें...',
      voiceNotSupported: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है'
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
      other: 'इतर',
      speakNow: 'आता बोला...',
      voiceNotSupported: 'या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = currentLanguage === 'हिंदी' ? 'hi-IN' : currentLanguage === 'मराठी' ? 'mr-IN' : 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (voiceField) {
          handleInputChange(voiceField, transcript);
        }
        setIsListening(false);
        setVoiceField(null);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
        setVoiceField(null);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
        setVoiceField(null);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [currentLanguage]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVoiceInput = (field: string) => {
    if (!recognition) {
      alert(t.voiceNotSupported);
      return;
    }
    
    setIsListening(true);
    setVoiceField(field);
    recognition.start();
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
      utterance.lang = currentLanguage === 'हिंदी' ? 'hi-IN' : currentLanguage === 'मराठी' ? 'mr-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#F2F4F7' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse" style={{ background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' }}>
              <ShoppingCart className="w-10 h-10 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-spin" />
            </div>
            <h1 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
              onMouseEnter={() => speakText(t.title)}
            >
              {t.title}
            </h1>
            <p 
              className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
              onMouseEnter={() => speakText(t.subtitle)}
            >
              {t.subtitle}
            </p>
          </div>
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
        </div>

        {/* AI Voice Assistant Card */}
        <div className="glassmorphism rounded-2xl p-4 mb-6 border border-white/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: '#3CAEA3' }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 
                className="font-semibold cursor-pointer hover:text-teal-600 transition-colors" 
                style={{ color: '#1A1A1A' }}
                onMouseEnter={() => speakText(t.voiceAssistant)}
              >
                {t.voiceAssistant}
              </h3>
              <p 
                className="text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
                onMouseEnter={() => speakText(t.tapToSpeak)}
              >
                {t.tapToSpeak}
              </p>
            </div>
          </div>
        </div>

        {/* Innovative Toggle Buttons */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1 mb-6 shadow-inner">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              !isSignUp 
                ? 'text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
            style={{ backgroundColor: !isSignUp ? '#20639B' : 'transparent' }}
            onMouseEnter={() => speakText(t.signIn)}
          >
            {t.signIn}
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              isSignUp 
                ? 'text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
            style={{ backgroundColor: isSignUp ? '#20639B' : 'transparent' }}
            onMouseEnter={() => speakText(t.signUp)}
          >
            {t.signUp}
          </button>
        </div>

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors" 
                  style={{ color: '#1A1A1A' }}
                  onMouseEnter={() => speakText(t.fullName)}
                >
                  {t.fullName}
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    style={{ focusRingColor: '#3CAEA3' }}
                    placeholder="Enter your full name"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('name')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      isListening && voiceField === 'name' ? 'animate-pulse' : ''
                    }`}
                    style={{ color: '#3CAEA3' }}
                  >
                    {isListening && voiceField === 'name' ? (
                      <div className="flex items-center space-x-1">
                        <MicOff className="w-5 h-5 animate-pulse" />
                        <span className="text-xs">{t.listening}</span>
                      </div>
                    ) : (
                      <Mic className="w-5 h-5 hover:text-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors" 
                  style={{ color: '#1A1A1A' }}
                  onMouseEnter={() => speakText(t.village)}
                >
                  {t.village}
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                    style={{ focusRingColor: '#3CAEA3' }}
                    placeholder="Enter your village name"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('village')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      isListening && voiceField === 'village' ? 'animate-pulse' : ''
                    }`}
                    style={{ color: '#3CAEA3' }}
                  >
                    {isListening && voiceField === 'village' ? (
                      <MicOff className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Mic className="w-5 h-5 hover:text-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors" 
                  style={{ color: '#1A1A1A' }}
                  onMouseEnter={() => speakText(t.shopType)}
                >
                  {t.shopType}
                </label>
                <div className="relative group">
                  <select
                    value={formData.shopType}
                    onChange={(e) => handleInputChange('shopType', e.target.value)}
                    className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent appearance-none transition-all duration-300 hover:shadow-md"
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
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                      isListening && voiceField === 'shopType' ? 'animate-pulse' : ''
                    }`}
                    style={{ color: '#3CAEA3' }}
                  >
                    {isListening && voiceField === 'shopType' ? (
                      <MicOff className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Mic className="w-5 h-5 hover:text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label 
              className="block text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors" 
              style={{ color: '#1A1A1A' }}
              onMouseEnter={() => speakText(t.phoneNumber)}
            >
              {t.phoneNumber}
            </label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="+91 9876543210"
                required
              />
              <button
                type="button"
                onClick={() => handleVoiceInput('phone')}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isListening && voiceField === 'phone' ? 'animate-pulse' : ''
                }`}
                style={{ color: '#3CAEA3' }}
              >
                {isListening && voiceField === 'phone' ? (
                  <MicOff className="w-5 h-5 animate-pulse" />
                ) : (
                  <Mic className="w-5 h-5 hover:text-blue-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors" 
              style={{ color: '#1A1A1A' }}
              onMouseEnter={() => speakText(t.password)}
            >
              {t.password}
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label 
                className="block text-sm font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors" 
                style={{ color: '#1A1A1A' }}
                onMouseEnter={() => speakText(t.confirmPassword)}
              >
                {t.confirmPassword}
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  style={{ focusRingColor: '#3CAEA3' }}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            style={{ background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' }}
            onMouseEnter={() => speakText(isSignUp ? t.createAccount : t.signIn)}
          >
            {isSignUp ? t.createAccount : t.signIn}
          </button>

          {/* LocalHelper Login Button */}
          <button
            type="button"
            className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            style={{ background: 'linear-gradient(135deg, #3CAEA3 0%, #20639B 100%)' }}
            onMouseEnter={() => speakText(t.localHelperLogin)}
          >
            {t.localHelperLogin}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <span 
              className="cursor-pointer hover:text-gray-800 transition-colors"
              onMouseEnter={() => speakText(isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount)}
            >
              {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}
            </span>{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium hover:opacity-80 transition-all duration-300 hover:scale-105 transform inline-block"
              style={{ color: '#20639B' }}
              onMouseEnter={() => speakText(isSignUp ? t.signIn : t.signUp)}
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
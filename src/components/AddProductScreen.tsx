import React, { useState, useEffect } from 'react';
import { Mic, Camera, Check, Upload, Tag, Type, Volume2, Shield, AlertTriangle, MicOff, Sparkles } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface AddProductScreenProps {
  onNavigate: (screen: string) => void;
  currentLanguage: string;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ onNavigate, currentLanguage }) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [showKYCWarning, setShowKYCWarning] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: ''
  });

  const translations = {
    'English': {
      title: 'Add Products',
      kycRequired: 'KYC Verification Required',
      kycWarning: 'Complete your KYC verification to start selling products. This is mandatory for all sellers.',
      completeKYC: 'Complete KYC Now',
      continueWithoutKYC: 'Continue (Limited Features)',
      voiceInput: 'Voice Input',
      textInput: 'Text Input',
      productName: 'Product Name',
      pricePerKg: 'Price per kg (₹)',
      quantity: 'Quantity (kg)',
      category: 'Category',
      selectCategory: 'Select category',
      fruits: 'Fruits',
      vegetables: 'Vegetables',
      grains: 'Grains',
      dairy: 'Dairy',
      other: 'Other',
      productSummary: 'Product Summary',
      addPhotos: 'Optional: Add Photos',
      takePhoto: 'Take Photo',
      recordVideo: 'Record Video',
      listProduct: 'List Product',
      productAdded: 'Product Added Successfully!',
      productListed: 'Your product has been listed in the marketplace',
      addAnother: 'Add Another',
      goToHome: 'Go to Home',
      tapToSpeak: 'Tap to Speak',
      listening: 'Listening...',
      aiSpeaking: 'AI is speaking...',
      startOver: 'Start Over',
      notSet: 'Not set',
      whatProduct: 'What product are you selling today?',
      whatPrice: 'What is the price per kilogram?',
      howMuchStock: 'How much stock do you have in kilograms?',
      whichCategory: 'Which category does this product belong to?'
    },
    'हिंदी': {
      title: 'उत्पाद जोड़ें',
      kycRequired: 'KYC सत्यापन आवश्यक',
      kycWarning: 'उत्पाद बेचना शुरू करने के लिए अपना KYC सत्यापन पूरा करें। यह सभी विक्रेताओं के लिए अनिवार्य है।',
      completeKYC: 'अभी KYC पूरा करें',
      continueWithoutKYC: 'जारी रखें (सीमित सुविधाएं)',
      voiceInput: 'आवाज़ इनपुट',
      textInput: 'टेक्स्ट इनपुट',
      productName: 'उत्पाद का नाम',
      pricePerKg: 'प्रति किलो कीमत (₹)',
      quantity: 'मात्रा (किलो)',
      category: 'श्रेणी',
      selectCategory: 'श्रेणी चुनें',
      fruits: 'फल',
      vegetables: 'सब्जियां',
      grains: 'अनाज',
      dairy: 'डेयरी',
      other: 'अन्य',
      productSummary: 'उत्पाद सारांश',
      addPhotos: 'वैकल्पिक: फोटो जोड़ें',
      takePhoto: 'फोटो लें',
      recordVideo: 'वीडियो रिकॉर्ड करें',
      listProduct: 'उत्पाद सूचीबद्ध करें',
      productAdded: 'उत्पाद सफलतापूर्वक जोड़ा गया!',
      productListed: 'आपका उत्पाद बाज़ार में सूचीबद्ध हो गया है',
      addAnother: 'एक और जोड़ें',
      goToHome: 'होम पर जाएं',
      tapToSpeak: 'बोलने के लिए टैप करें',
      listening: 'सुन रहा हूं...',
      aiSpeaking: 'AI बोल रहा है...',
      startOver: 'फिर से शुरू करें',
      notSet: 'सेट नहीं किया गया',
      whatProduct: 'आज आप कौन सा उत्पाद बेच रहे हैं?',
      whatPrice: 'प्रति किलोग्राम कीमत क्या है?',
      howMuchStock: 'आपके पास कितना स्टॉक है किलोग्राम में?',
      whichCategory: 'यह उत्पाद किस श्रेणी में आता है?'
    },
    'मराठी': {
      title: 'उत्पादने जोडा',
      kycRequired: 'KYC सत्यापन आवश्यक',
      kycWarning: 'उत्पादने विकण्यास सुरुवात करण्यासाठी तुमचे KYC सत्यापन पूर्ण करा. हे सर्व विक्रेत्यांसाठी अनिवार्य आहे.',
      completeKYC: 'आता KYC पूर्ण करा',
      continueWithoutKYC: 'सुरू ठेवा (मर्यादित वैशिष्ट्ये)',
      voiceInput: 'आवाज इनपुट',
      textInput: 'मजकूर इनपुट',
      productName: 'उत्पादनाचे नाव',
      pricePerKg: 'प्रति किलो किंमत (₹)',
      quantity: 'प्रमाण (किलो)',
      category: 'श्रेणी',
      selectCategory: 'श्रेणी निवडा',
      fruits: 'फळे',
      vegetables: 'भाज्या',
      grains: 'धान्य',
      dairy: 'दुग्धजन्य',
      other: 'इतर',
      productSummary: 'उत्पादन सारांश',
      addPhotos: 'पर्यायी: फोटो जोडा',
      takePhoto: 'फोटो घ्या',
      recordVideo: 'व्हिडिओ रेकॉर्ड करा',
      listProduct: 'उत्पादन सूचीबद्ध करा',
      productAdded: 'उत्पादन यशस्वीरित्या जोडले!',
      productListed: 'तुमचे उत्पादन बाजारपेठेत सूचीबद्ध झाले आहे',
      addAnother: 'आणखी एक जोडा',
      goToHome: 'होमवर जा',
      tapToSpeak: 'बोलण्यासाठी टॅप करा',
      listening: 'ऐकत आहे...',
      aiSpeaking: 'AI बोलत आहे...',
      startOver: 'पुन्हा सुरू करा',
      notSet: 'सेट केले नाही',
      whatProduct: 'आज तुम्ही कोणते उत्पादन विकत आहात?',
      whatPrice: 'प्रति किलोग्राम किंमत काय आहे?',
      howMuchStock: 'तुमच्याकडे किती स्टॉक आहे किलोग्राममध्ये?',
      whichCategory: 'हे उत्पादन कोणत्या श्रेणीत येते?'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  const voiceSteps = [
    { question: t.whatProduct, field: 'name' },
    { question: t.whatPrice, field: 'price' },
    { question: t.howMuchStock, field: 'quantity' },
    { question: t.whichCategory, field: 'category' }
  ];

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
        const currentStep = voiceSteps[voiceStep];
        setProductData(prev => ({
          ...prev,
          [currentStep.field]: transcript
        }));
        setIsListening(false);
        
        if (voiceStep < voiceSteps.length - 1) {
          const nextStep = voiceStep + 1;
          setVoiceStep(nextStep);
          setTimeout(() => {
            speakText(voiceSteps[nextStep].question);
          }, 1000);
        }
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [currentLanguage, voiceStep]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      utterance.lang = currentLanguage === 'हिंदी' ? 'hi-IN' : currentLanguage === 'मराठी' ? 'mr-IN' : 'en-US';
      
      utterance.onstart = () => setIsAISpeaking(true);
      utterance.onend = () => setIsAISpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (inputMode === 'voice' && voiceStep === 0) {
      setTimeout(() => {
        speakText(voiceSteps[0].question);
      }, 500);
    }
  }, [inputMode]);

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Voice input not supported in this browser');
      return;
    }
    
    setIsListening(true);
    recognition.start();
  };

  const handleTextInput = (field: string, value: string) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetVoiceFlow = () => {
    setVoiceStep(0);
    setProductData({ name: '', price: '', quantity: '', category: '' });
    window.speechSynthesis.cancel();
    setTimeout(() => {
      speakText(voiceSteps[0].question);
    }, 500);
  };

  const handleListProduct = () => {
    speakText("Product added successfully! Your product is now listed in the marketplace.");
    setShowSuccessModal(true);
  };

  const handleReplayQuestion = () => {
    speakText(voiceSteps[voiceStep].question);
  };

  const KYCWarningModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse" style={{ background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' }}>
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A1A1A' }}>{t.kycRequired}</h3>
          <div className="flex items-start space-x-3 p-4 rounded-2xl" style={{ backgroundColor: '#FEF3C7' }}>
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">{t.kycWarning}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => {
              setShowKYCWarning(false);
              onNavigate('profile');
            }}
            className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' }}
          >
            {t.completeKYC}
          </button>
          <button
            onClick={() => setShowKYCWarning(false)}
            className="w-full py-4 border-2 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#3CAEA3' }}
          >
            {t.continueWithoutKYC}
          </button>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-white/20">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A1A1A' }}>{t.productAdded}</h3>
        <p className="text-gray-600 mb-8">{t.productListed}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setShowSuccessModal(false);
              resetVoiceFlow();
            }}
            className="flex-1 py-3 border-2 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#3CAEA3' }}
          >
            {t.addAnother}
          </button>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              onNavigate('home');
            }}
            className="flex-1 py-3 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
          >
            {t.goToHome}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* KYC Warning Modal */}
      {showKYCWarning && <KYCWarningModal />}

      {/* Header with Language Selector */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{t.title}</h2>
        </div>
        <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={() => {}} />
      </div>

      {/* Input Mode Toggle */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10">
        <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#1A1A1A' }}>
          <Volume2 className="w-6 h-6 mr-3 text-blue-600" />
          Choose Input Method
        </h3>
        <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1 shadow-inner">
          <button
            onClick={() => {
              setInputMode('voice');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-3 ${
              inputMode === 'voice' 
                ? 'text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
            style={{ background: inputMode === 'voice' ? 'linear-gradient(135deg, #3CAEA3 0%, #20639B 100%)' : 'transparent' }}
          >
            <Volume2 className="w-5 h-5" />
            <span>{t.voiceInput}</span>
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setInputMode('text');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-3 ${
              inputMode === 'text' 
                ? 'text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
            style={{ background: inputMode === 'text' ? 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' : 'transparent' }}
          >
            <Type className="w-5 h-5" />
            <span>{t.textInput}</span>
          </button>
        </div>
      </div>

      {/* Voice Input Section */}
      {inputMode === 'voice' && (
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isAISpeaking ? 'animate-pulse' : ''}`} style={{ background: 'linear-gradient(135deg, #3CAEA3 0%, #20639B 100%)' }}>
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>AI Voice Assistant</h3>
              <p className="text-gray-600">Step {voiceStep + 1} of {voiceSteps.length}</p>
            </div>
          </div>

          <div className="glassmorphism rounded-2xl p-6 mb-6 border border-white/30">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${isAISpeaking ? 'animate-bounce' : ''}`} style={{ background: 'linear-gradient(135deg, #3CAEA3 0%, #20639B 100%)' }}>
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium text-lg" style={{ color: '#1A1A1A' }}>{voiceSteps[voiceStep]?.question}</p>
                  <button
                    onClick={handleReplayQuestion}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}
                    title="Replay question"
                  >
                    <Volume2 className="w-5 h-5 text-white" />
                  </button>
                </div>
                {isAISpeaking && (
                  <div className="flex items-center space-x-2" style={{ color: '#3CAEA3' }}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#3CAEA3' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#3CAEA3', animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#3CAEA3', animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm font-medium">{t.aiSpeaking}</span>
                  </div>
                )}
                {productData[voiceSteps[voiceStep]?.field as keyof typeof productData] && (
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium px-4 py-2 rounded-xl text-green-800 bg-green-100 border border-green-200">
                      {productData[voiceSteps[voiceStep]?.field as keyof typeof productData]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleVoiceInput}
            disabled={isListening || isAISpeaking}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl ${
              isListening || isAISpeaking
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 transform'
            }`}
            style={{ background: 'linear-gradient(135deg, #3CAEA3 0%, #20639B 100%)' }}
          >
            {isListening ? (
              <span className="flex items-center justify-center">
                <MicOff className="w-6 h-6 mr-3 animate-pulse" />
                {t.listening}
                <div className="ml-3 flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </span>
            ) : isAISpeaking ? (
              <span className="flex items-center justify-center">
                <Volume2 className="w-6 h-6 mr-3 animate-pulse" />
                {t.aiSpeaking}
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Mic className="w-6 h-6 mr-3" />
                {t.tapToSpeak}
                <Sparkles className="w-5 h-5 ml-3 animate-spin" />
              </span>
            )}
          </button>

          {voiceStep > 0 && (
            <button
              onClick={resetVoiceFlow}
              className="w-full mt-4 py-3 font-medium hover:scale-105 transition-transform text-blue-600 hover:text-blue-700"
            >
              {t.startOver}
            </button>
          )}
        </div>
      )}

      {/* Text Input Section */}
      {inputMode === 'text' && (
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #20639B 0%, #3CAEA3 100%)' }}>
              <Type className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>{t.textInput}</h3>
              <p className="text-gray-600">Fill in product details</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#1A1A1A' }}>{t.productName}</label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => handleTextInput('name', e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="e.g., Fresh Mangoes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#1A1A1A' }}>{t.pricePerKg}</label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => handleTextInput('price', e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="e.g., 80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#1A1A1A' }}>{t.quantity}</label>
              <input
                type="number"
                value={productData.quantity}
                onChange={(e) => handleTextInput('quantity', e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="e.g., 20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#1A1A1A' }}>{t.category}</label>
              <select
                value={productData.category}
                onChange={(e) => handleTextInput('category', e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 hover:shadow-md"
                style={{ focusRingColor: '#3CAEA3' }}
              >
                <option value="">{t.selectCategory}</option>
                <option value="Fruits">{t.fruits}</option>
                <option value="Vegetables">{t.vegetables}</option>
                <option value="Grains">{t.grains}</option>
                <option value="Dairy">{t.dairy}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Product Summary */}
      {Object.values(productData).some(value => value) && (
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#1A1A1A' }}>
            <Tag className="w-6 h-6 mr-3 text-blue-600" />
            {t.productSummary}
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-4 border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Product</p>
              <p className="font-semibold text-lg" style={{ color: '#1A1A1A' }}>{productData.name || t.notSet}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <p className="font-semibold text-lg" style={{ color: '#1A1A1A' }}>{productData.price ? `₹${productData.price}` : t.notSet}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Quantity</p>
              <p className="font-semibold text-lg" style={{ color: '#1A1A1A' }}>{productData.quantity ? `${productData.quantity} kg` : t.notSet}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="font-semibold text-lg" style={{ color: '#1A1A1A' }}>{productData.category || t.notSet}</p>
            </div>
          </div>
        </div>
      )}

      {/* Optional Image Upload */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10">
        <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#1A1A1A' }}>
          <Camera className="w-6 h-6 mr-3 text-purple-600" />
          {t.addPhotos}
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <button className="group border-2 border-dashed rounded-2xl p-8 hover:bg-blue-50 transition-all duration-300 hover:scale-105" style={{ borderColor: '#20639B' }}>
            <Camera className="w-12 h-12 mx-auto mb-4 group-hover:animate-bounce" style={{ color: '#20639B' }} />
            <p className="text-sm font-medium" style={{ color: '#20639B' }}>{t.takePhoto}</p>
          </button>
          <button className="group border-2 border-dashed rounded-2xl p-8 hover:bg-teal-50 transition-all duration-300 hover:scale-105" style={{ borderColor: '#3CAEA3' }}>
            <Upload className="w-12 h-12 mx-auto mb-4 group-hover:animate-bounce" style={{ color: '#3CAEA3' }} />
            <p className="text-sm font-medium" style={{ color: '#3CAEA3' }}>{t.recordVideo}</p>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      {Object.values(productData).every(value => value) && (
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10">
          <button 
            onClick={handleListProduct}
            className="w-full py-4 text-white font-semibold rounded-2xl hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
          >
            <span className="flex items-center justify-center">
              <Check className="w-6 h-6 mr-3" />
              {t.listProduct}
              <Sparkles className="w-5 h-5 ml-3 animate-spin" />
            </span>
          </button>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default AddProductScreen;
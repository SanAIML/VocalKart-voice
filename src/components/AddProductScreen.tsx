import React, { useState, useEffect } from 'react';
import { Mic, Camera, Check, Upload, Tag, Type, Volume2, Shield, AlertTriangle } from 'lucide-react';
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
      notSet: 'Not set'
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
      notSet: 'सेट नहीं किया गया'
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
      notSet: 'सेट केले नाही'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  const voiceSteps = [
    { question: "What are you selling today?", answer: "Mangoes", field: 'name' },
    { question: "Price per kilo?", answer: "₹80", field: 'price' },
    { question: "How much stock?", answer: "20 kilos", field: 'quantity' },
    { question: "Shall I add it to Fruits category?", answer: "Yes", field: 'category' }
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
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
    setIsListening(true);
    setTimeout(() => {
      const currentStep = voiceSteps[voiceStep];
      setProductData(prev => ({
        ...prev,
        [currentStep.field]: currentStep.answer
      }));
      setIsListening(false);
      
      if (voiceStep < voiceSteps.length - 1) {
        const nextStep = voiceStep + 1;
        setVoiceStep(nextStep);
        setTimeout(() => {
          speakText(voiceSteps[nextStep].question);
        }, 1000);
      }
    }, 2000);
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#20639B' }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1A1A' }}>{t.kycRequired}</h3>
          <div className="flex items-start space-x-2 p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">{t.kycWarning}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => {
              setShowKYCWarning(false);
              onNavigate('profile');
            }}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg"
            style={{ backgroundColor: '#20639B' }}
          >
            {t.completeKYC}
          </button>
          <button
            onClick={() => setShowKYCWarning(false)}
            className="w-full py-3 border-2 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3CAEA3' }}>
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>{t.productAdded}</h3>
        <p className="text-gray-600 mb-6">{t.productListed}</p>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setShowSuccessModal(false);
              resetVoiceFlow();
            }}
            className="flex-1 py-3 border-2 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#3CAEA3' }}
          >
            {t.addAnother}
          </button>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              onNavigate('home');
            }}
            className="flex-1 py-3 text-white rounded-xl transition-all duration-200 shadow-lg"
            style={{ backgroundColor: '#3CAEA3' }}
          >
            {t.goToHome}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* KYC Warning Modal */}
      {showKYCWarning && <KYCWarningModal />}

      {/* Header with Language Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>{t.title}</h2>
        <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={() => {}} />
      </div>

      {/* Input Mode Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Choose Input Method</h3>
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => {
              setInputMode('voice');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              inputMode === 'voice' 
                ? 'text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ backgroundColor: inputMode === 'voice' ? '#3CAEA3' : 'transparent' }}
          >
            <Volume2 className="w-5 h-5" />
            <span>{t.voiceInput}</span>
          </button>
          <button
            onClick={() => {
              setInputMode('text');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              inputMode === 'text' 
                ? 'text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ backgroundColor: inputMode === 'text' ? '#20639B' : 'transparent' }}
          >
            <Type className="w-5 h-5" />
            <span>{t.textInput}</span>
          </button>
        </div>
      </div>

      {/* Voice Input Section */}
      {inputMode === 'voice' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAISpeaking ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#3CAEA3' }}>
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>AI Voice Assistant</h3>
              <p className="text-sm text-gray-600">Step {voiceStep + 1} of {voiceSteps.length}</p>
            </div>
          </div>

          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: '#F2F4F7' }}>
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isAISpeaking ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#3CAEA3' }}>
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-lg" style={{ color: '#1A1A1A' }}>{voiceSteps[voiceStep]?.question}</p>
                  <button
                    onClick={handleReplayQuestion}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#20639B' }}
                    title="Replay question"
                  >
                    <Volume2 className="w-4 h-4 text-white" />
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
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#20639B' }}>
                      <span className="text-white text-xs">U</span>
                    </div>
                    <span className="font-medium px-3 py-1 rounded-lg" style={{ color: '#20639B', backgroundColor: '#E0F2FE' }}>
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
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              isListening || isAISpeaking
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-90 shadow-lg hover:shadow-xl'
            }`}
            style={{ backgroundColor: '#3CAEA3' }}
          >
            {isListening ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t.listening}
              </span>
            ) : isAISpeaking ? (
              <span className="flex items-center justify-center">
                <Volume2 className="w-5 h-5 mr-2 animate-pulse" />
                {t.aiSpeaking}
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Mic className="w-5 h-5 mr-2" />
                {t.tapToSpeak}
              </span>
            )}
          </button>

          {voiceStep > 0 && (
            <button
              onClick={resetVoiceFlow}
              className="w-full mt-2 py-2 font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#3CAEA3' }}
            >
              {t.startOver}
            </button>
          )}
        </div>
      )}

      {/* Text Input Section */}
      {inputMode === 'text' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#20639B' }}>
              <Type className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>{t.textInput}</h3>
              <p className="text-sm text-gray-600">Fill in product details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.productName}</label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => handleTextInput('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="e.g., Fresh Mangoes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.pricePerKg}</label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => handleTextInput('price', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="e.g., 80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.quantity}</label>
              <input
                type="number"
                value={productData.quantity}
                onChange={(e) => handleTextInput('quantity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder="e.g., 20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A1A1A' }}>{t.category}</label>
              <select
                value={productData.category}
                onChange={(e) => handleTextInput('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#1A1A1A' }}>
            <Tag className="w-5 h-5 mr-2" />
            {t.productSummary}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg p-3" style={{ backgroundColor: '#FEF3C7' }}>
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>{productData.name || t.notSet}</p>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: '#D1FAE5' }}>
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>{productData.price ? `₹${productData.price}` : t.notSet}</p>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: '#DBEAFE' }}>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>{productData.quantity ? `${productData.quantity} kg` : t.notSet}</p>
            </div>
            <div className="rounded-lg p-3" style={{ backgroundColor: '#E0E7FF' }}>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>{productData.category || t.notSet}</p>
            </div>
          </div>
        </div>
      )}

      {/* Optional Image Upload */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#1A1A1A' }}>
          <Camera className="w-5 h-5 mr-2" />
          {t.addPhotos}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="border-2 border-dashed rounded-xl p-6 hover:bg-gray-50 transition-all duration-200" style={{ borderColor: '#20639B' }}>
            <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: '#20639B' }} />
            <p className="text-sm font-medium" style={{ color: '#20639B' }}>{t.takePhoto}</p>
          </button>
          <button className="border-2 border-dashed rounded-xl p-6 hover:bg-gray-50 transition-all duration-200" style={{ borderColor: '#3CAEA3' }}>
            <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#3CAEA3' }} />
            <p className="text-sm font-medium" style={{ color: '#3CAEA3' }}>{t.recordVideo}</p>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      {Object.values(productData).every(value => value) && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <button 
            onClick={handleListProduct}
            className="w-full py-4 text-white font-semibold rounded-xl hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ backgroundColor: '#3CAEA3' }}
          >
            <span className="flex items-center justify-center">
              <Check className="w-5 h-5 mr-2" />
              {t.listProduct}
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
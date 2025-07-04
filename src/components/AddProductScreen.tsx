import React, { useState, useEffect } from 'react';
import { Mic, Camera, Play, Check, Upload, Tag, ArrowLeft, Type, Volume2 } from 'lucide-react';

interface AddProductScreenProps {
  onNavigate: (screen: string) => void;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ onNavigate }) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: ''
  });

  const voiceSteps = [
    { question: "What are you selling today?", answer: "Mangoes", field: 'name' },
    { question: "Price per kilo?", answer: "₹80", field: 'price' },
    { question: "How much stock?", answer: "20 kilos", field: 'quantity' },
    { question: "Shall I add it to Fruits category?", answer: "Yes", field: 'category' }
  ];

  // Text-to-Speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
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

  // Auto-speak the first question when voice mode is selected
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
      
      // Move to next step and speak next question
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

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Product Added Successfully!</h3>
        <p className="text-gray-600 mb-6">Your {productData.name} has been listed in the marketplace</p>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setShowSuccessModal(false);
              resetVoiceFlow();
            }}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Add Another
          </button>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              onNavigate('home');
            }}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
      </div>

      {/* Input Mode Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Input Method</h3>
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => {
              setInputMode('voice');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              inputMode === 'voice' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>Voice Input</span>
          </button>
          <button
            onClick={() => {
              setInputMode('text');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              inputMode === 'text' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Type className="w-5 h-5" />
            <span>Text Input</span>
          </button>
        </div>
      </div>

      {/* Voice Input Section */}
      {inputMode === 'voice' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center ${isAISpeaking ? 'animate-pulse' : ''}`}>
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">AI Voice Assistant</h3>
              <p className="text-sm text-gray-600">Step {voiceStep + 1} of {voiceSteps.length}</p>
            </div>
          </div>

          {/* AI Question Display */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 mb-4 border-2 border-green-200">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 ${isAISpeaking ? 'animate-bounce' : ''}`}>
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-800 font-medium text-lg">{voiceSteps[voiceStep]?.question}</p>
                  <button
                    onClick={handleReplayQuestion}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    title="Replay question"
                  >
                    <Volume2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                {isAISpeaking && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm font-medium">AI is speaking...</span>
                  </div>
                )}
                {productData[voiceSteps[voiceStep]?.field as keyof typeof productData] && (
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">U</span>
                    </div>
                    <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-lg">
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
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isListening ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Listening...
              </span>
            ) : isAISpeaking ? (
              <span className="flex items-center justify-center">
                <Volume2 className="w-5 h-5 mr-2 animate-pulse" />
                AI is speaking...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Mic className="w-5 h-5 mr-2" />
                Tap to Speak
              </span>
            )}
          </button>

          {voiceStep > 0 && (
            <button
              onClick={resetVoiceFlow}
              className="w-full mt-2 py-2 text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      )}

      {/* Text Input Section */}
      {inputMode === 'text' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Type className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Text Input</h3>
              <p className="text-sm text-gray-600">Fill in product details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => handleTextInput('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Fresh Mangoes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per kg (₹)</label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => handleTextInput('price', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
              <input
                type="number"
                value={productData.quantity}
                onChange={(e) => handleTextInput('quantity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={productData.category}
                onChange={(e) => handleTextInput('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Product Summary */}
      {Object.values(productData).some(value => value) && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Product Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-semibold text-gray-800">{productData.name || 'Not set'}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-semibold text-gray-800">{productData.price ? `₹${productData.price}` : 'Not set'}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="font-semibold text-gray-800">{productData.quantity ? `${productData.quantity} kg` : 'Not set'}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold text-gray-800">{productData.category || 'Not set'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Optional Image Upload */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Optional: Add Photos
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
            <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-600 font-medium">Take Photo</p>
          </button>
          <button className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-dashed border-purple-300 rounded-xl p-6 hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
            <Play className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-purple-600 font-medium">Record Video</p>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      {Object.values(productData).every(value => value) && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <button 
            onClick={handleListProduct}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span className="flex items-center justify-center">
              <Check className="w-5 h-5 mr-2" />
              List Product
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
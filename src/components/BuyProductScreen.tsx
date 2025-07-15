import React, { useState, useEffect } from 'react';
import { Mic, MapPin, Volume2, ShoppingCart, CreditCard, Smartphone, Check, Phone, Plus, Minus, X, Type, Search } from 'lucide-react';

interface BuyProductScreenProps {
  onNavigate: (screen: string) => void;
  currentLanguage: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  vendor: string;
}

const BuyProductScreen: React.FC<BuyProductScreenProps> = ({ onNavigate, currentLanguage }) => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [searchMode, setSearchMode] = useState<'voice' | 'text'>('voice');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('What would you like to buy today?');

  const translations = {
    'English': {
      title: 'Buy Products',
      voiceSearch: 'Voice Search',
      textSearch: 'Text Search',
      availableProducts: 'Available Products',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      callVendor: 'Call Vendor',
      cart: 'Shopping Cart',
      checkout: 'Proceed to Checkout',
      paymentMethod: 'Choose Payment Method',
      upiPayment: 'UPI Payment',
      cashOnDelivery: 'Cash on Delivery',
      paymentSuccess: 'Payment Done Successfully!',
      orderConfirmed: 'Your order has been confirmed',
      goToHome: 'Go to Home',
      tapToSpeak: 'Tap to Search by Voice',
      listening: 'Listening...',
      aiSpeaking: 'AI is speaking...',
      typeSearch: 'Type what you\'re looking for...',
      cartEmpty: 'Your cart is empty',
      total: 'Total',
      items: 'items',
      cancel: 'Cancel'
    },
    'हिंदी': {
      title: 'उत्पाद खरीदें',
      voiceSearch: 'आवाज़ खोज',
      textSearch: 'टेक्स्ट खोज',
      availableProducts: 'उपलब्ध उत्पाद',
      addToCart: 'कार्ट में जोड़ें',
      buyNow: 'अभी खरीदें',
      callVendor: 'विक्रेता को कॉल करें',
      cart: 'शॉपिंग कार्ट',
      checkout: 'चेकआउट पर जाएं',
      paymentMethod: 'भुगतान विधि चुनें',
      upiPayment: 'UPI भुगतान',
      cashOnDelivery: 'डिलीवरी पर भुगतान',
      paymentSuccess: 'भुगतान सफलतापूर्वक हो गया!',
      orderConfirmed: 'आपका ऑर्डर कन्फर्म हो गया है',
      goToHome: 'होम पर जाएं',
      tapToSpeak: 'आवाज़ से खोजने के लिए टैप करें',
      listening: 'सुन रहा हूं...',
      aiSpeaking: 'AI बोल रहा है...',
      typeSearch: 'आप क्या खोज रहे हैं टाइप करें...',
      cartEmpty: 'आपका कार्ट खाली है',
      total: 'कुल',
      items: 'वस्तुएं',
      cancel: 'रद्द करें'
    },
    'मराठी': {
      title: 'उत्पादने खरेदी करा',
      voiceSearch: 'आवाज शोध',
      textSearch: 'मजकूर शोध',
      availableProducts: 'उपलब्ध उत्पादने',
      addToCart: 'कार्टमध्ये जोडा',
      buyNow: 'आता खरेदी करा',
      callVendor: 'विक्रेत्याला कॉल करा',
      cart: 'शॉपिंग कार्ट',
      checkout: 'चेकआउटवर जा',
      paymentMethod: 'पेमेंट पद्धत निवडा',
      upiPayment: 'UPI पेमेंट',
      cashOnDelivery: 'डिलिव्हरीवर पेमेंट',
      paymentSuccess: 'पेमेंट यशस्वीरित्या झाले!',
      orderConfirmed: 'तुमचा ऑर्डर कन्फर्म झाला आहे',
      goToHome: 'होमवर जा',
      tapToSpeak: 'आवाजाने शोधण्यासाठी टॅप करा',
      listening: 'ऐकत आहे...',
      aiSpeaking: 'AI बोलत आहे...',
      typeSearch: 'तुम्ही काय शोधत आहात ते टाइप करा...',
      cartEmpty: 'तुमचे कार्ट रिकामे आहे',
      total: 'एकूण',
      items: 'वस्तू',
      cancel: 'रद्द करा'
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['English'];

  const products = [
    {
      id: 1,
      name: 'Fresh Onions',
      price: 30,
      vendor: 'Ramu Bhaiya\'s Shop',
      vendorPhone: '+91 9876543210',
      distance: '1.2 km',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.5,
      description: 'Fresh, locally grown onions'
    },
    {
      id: 2,
      name: 'Organic Tomatoes',
      price: 40,
      vendor: 'Geeta Devi\'s Farm',
      vendorPhone: '+91 9876543211',
      distance: '0.8 km',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.8,
      description: 'Organic, pesticide-free tomatoes'
    },
    {
      id: 3,
      name: 'Sweet Mangoes',
      price: 80,
      vendor: 'Krishnan Uncle\'s Garden',
      vendorPhone: '+91 9876543212',
      distance: '2.1 km',
      image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.9,
      description: 'Sweet, ripe mangoes'
    }
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
    if (searchMode === 'voice') {
      setTimeout(() => {
        speakText(aiQuestion);
      }, 500);
    }
  }, [searchMode]);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      const searchResult = '5 kg onions';
      setSearchQuery(searchResult);
      setIsListening(false);
      
      setTimeout(() => {
        const responseText = `I found ${products.length} vendors selling onions near you. Here are the best options.`;
        speakText(responseText);
      }, 1000);
    }, 2000);
  };

  const handleTextSearch = (value: string) => {
    setSearchQuery(value);
  };

  const addToCart = (product: any, quantity: number = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        vendor: product.vendor
      }]);
    }
    
    setShowCartNotification(true);
    speakText(`${product.name} added to your cart!`);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const updateCartQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentOptions(false);
    setShowPaymentSuccess(true);
    speakText(`Payment successful using ${method}! Your order has been confirmed.`);
  };

  const handleCallVendor = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const CartNotification = () => (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce" style={{ backgroundColor: '#3CAEA3' }}>
      <Check className="w-5 h-5" />
      <span className="font-medium">Product added to cart!</span>
    </div>
  );

  const CartModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[600px] flex flex-col">
        <div className="p-6 rounded-t-2xl text-white" style={{ backgroundColor: '#20639B' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{t.cart}</h3>
            <button
              onClick={() => setShowCart(false)}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t.cartEmpty}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold" style={{ color: '#1A1A1A' }}>{item.name}</h4>
                    <span className="font-bold" style={{ color: '#3CAEA3' }}>₹{item.price}/kg</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.vendor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 text-white rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#20639B' }}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity} kg</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 text-white rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#20639B' }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold" style={{ color: '#1A1A1A' }}>₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold" style={{ color: '#1A1A1A' }}>{t.total}: ₹{getTotalPrice()}</span>
              <span className="text-sm text-gray-600">{getTotalItems()} {t.items}</span>
            </div>
            <button
              onClick={() => {
                setShowCart(false);
                setShowPaymentOptions(true);
                speakText(`Your cart total is ${getTotalPrice()} rupees. Please choose your payment method.`);
              }}
              className="w-full text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-lg"
              style={{ backgroundColor: '#20639B' }}
            >
              {t.checkout}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const PaymentSuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3CAEA3' }}>
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>{t.paymentSuccess}</h3>
        <p className="text-gray-600 mb-4">{t.orderConfirmed}</p>
        <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#F2F4F7' }}>
          <p className="text-sm text-gray-600">Payment Method</p>
          <p className="font-semibold" style={{ color: '#1A1A1A' }}>{selectedPaymentMethod}</p>
          <p className="text-sm text-gray-600 mt-2">Order ID: #VK{Math.floor(Math.random() * 10000)}</p>
          <p className="text-sm text-gray-600">{t.total}: ₹{getTotalPrice()}</p>
        </div>
        <button
          onClick={() => {
            setShowPaymentSuccess(false);
            setCart([]);
            onNavigate('home');
          }}
          className="w-full py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
          style={{ backgroundColor: '#3CAEA3' }}
        >
          {t.goToHome}
        </button>
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#1A1A1A' }}>{t.paymentMethod}</h3>
        
        <div className="space-y-4">
          <button 
            onClick={() => handlePaymentSelect('UPI Payment')}
            className="w-full text-white p-4 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
            style={{ backgroundColor: '#20639B' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6" />
                <span className="font-semibold">{t.upiPayment}</span>
              </div>
              <span className="text-sm">Instant</span>
            </div>
          </button>
          
          <button 
            onClick={() => handlePaymentSelect('Cash on Delivery')}
            className="w-full text-white p-4 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
            style={{ backgroundColor: '#3CAEA3' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6" />
                <span className="font-semibold">{t.cashOnDelivery}</span>
              </div>
              <span className="text-sm">Pay Later</span>
            </div>
          </button>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => setShowPaymentOptions(false)}
            className="w-full py-3 border-2 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#3CAEA3' }}
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Cart Notification */}
      {showCartNotification && <CartNotification />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>{t.title}</h2>
        
        {/* Cart Button */}
        <button
          onClick={() => setShowCart(true)}
          className="relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#20639B' }}
        >
          <ShoppingCart className="w-6 h-6 text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 text-white text-xs rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#3CAEA3' }}>
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Search Mode Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Choose Search Method</h3>
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => {
              setSearchMode('voice');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              searchMode === 'voice' 
                ? 'text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ backgroundColor: searchMode === 'voice' ? '#20639B' : 'transparent' }}
          >
            <Volume2 className="w-5 h-5" />
            <span>{t.voiceSearch}</span>
          </button>
          <button
            onClick={() => {
              setSearchMode('text');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              searchMode === 'text' 
                ? 'text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ backgroundColor: searchMode === 'text' ? '#3CAEA3' : 'transparent' }}
          >
            <Type className="w-5 h-5" />
            <span>{t.textSearch}</span>
          </button>
        </div>

        {/* Voice Search */}
        {searchMode === 'voice' && (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAISpeaking ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#20639B' }}>
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>AI Voice Search</h4>
                <p className="text-sm text-gray-600">Tell us what you need</p>
              </div>
            </div>

            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: '#F2F4F7' }}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isAISpeaking ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#20639B' }}>
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-lg" style={{ color: '#1A1A1A' }}>{aiQuestion}</p>
                    <button
                      onClick={() => speakText(aiQuestion)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: '#3CAEA3' }}
                      title="Replay question"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {isAISpeaking && (
                    <div className="flex items-center space-x-2" style={{ color: '#20639B' }}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#20639B' }}></div>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#20639B', animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#20639B', animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm font-medium">{t.aiSpeaking}</span>
                    </div>
                  )}
                  {searchQuery && (
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3CAEA3' }}>
                        <span className="text-white text-xs">U</span>
                      </div>
                      <span className="font-medium px-3 py-1 rounded-lg" style={{ color: '#3CAEA3', backgroundColor: '#E0F2FE' }}>
                        "{searchQuery}"
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleVoiceSearch}
              disabled={isListening || isAISpeaking}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                isListening || isAISpeaking
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:opacity-90 shadow-lg hover:shadow-xl'
              }`}
              style={{ backgroundColor: '#20639B' }}
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
          </div>
        )}

        {/* Text Search */}
        {searchMode === 'text' && (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3CAEA3' }}>
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>{t.textSearch}</h4>
                <p className="text-sm text-gray-600">Type what you're looking for</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleTextSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#3CAEA3' }}
                placeholder={t.typeSearch}
              />
            </div>
          </div>
        )}
      </div>

      {/* Products List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>{t.availableProducts}</h3>
        
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold" style={{ color: '#1A1A1A' }}>{product.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.vendor} • {product.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: '#3CAEA3' }}>₹{product.price}/kg</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => handleCallVendor(product.vendorPhone)}
                className="flex-1 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                style={{ backgroundColor: '#3CAEA3' }}
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{t.callVendor}</span>
              </button>
              <button
                onClick={() => addToCart(product)}
                className="flex-1 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg flex items-center justify-center"
                style={{ backgroundColor: '#20639B' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="text-sm">{t.addToCart}</span>
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  setShowPaymentOptions(true);
                }}
                className="flex-1 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg flex items-center justify-center"
                style={{ backgroundColor: '#3CAEA3' }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="text-sm">{t.buyNow}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showCart && <CartModal />}
      {showPaymentOptions && <PaymentModal />}
      {showPaymentSuccess && <PaymentSuccessModal />}
    </div>
  );
};

export default BuyProductScreen;
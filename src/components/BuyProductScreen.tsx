import React, { useState, useEffect } from 'react';
import { Mic, MapPin, Volume2, ShoppingCart, CreditCard, ArrowLeft, Smartphone, Check, Phone, Plus, Minus, X, Type, Search } from 'lucide-react';

interface BuyProductScreenProps {
  onNavigate: (screen: string) => void;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  vendor: string;
}

const BuyProductScreen: React.FC<BuyProductScreenProps> = ({ onNavigate }) => {
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

  // Auto-speak the initial question when voice mode is selected
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
      
      // AI responds with search results
      setTimeout(() => {
        const responseText = `I found ${products.length} vendors selling onions near you. Here are the best options.`;
        speakText(responseText);
      }, 1000);
    }, 2000);
  };

  const handleTextSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleReplayQuestion = () => {
    speakText(aiQuestion);
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
    
    // Show cart notification and speak confirmation
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

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentOptions(true);
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

  // Cart Notification Component
  const CartNotification = () => (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce">
      <Check className="w-5 h-5" />
      <span className="font-medium">Product added to cart!</span>
    </div>
  );

  const CartModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[600px] flex flex-col">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Shopping Cart</h3>
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
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <span className="text-green-600 font-bold">₹{item.price}/kg</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.vendor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity} kg</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-gray-800">Total: ₹{getTotalPrice()}</span>
              <span className="text-sm text-gray-600">{getTotalItems()} items</span>
            </div>
            <button
              onClick={() => {
                setShowCart(false);
                setShowPaymentOptions(true);
                speakText(`Your cart total is ${getTotalPrice()} rupees. Please choose your payment method.`);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const PaymentSuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Done Successfully!</h3>
        <p className="text-gray-600 mb-4">Your order has been confirmed</p>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">Payment Method</p>
          <p className="font-semibold text-gray-800">{selectedPaymentMethod}</p>
          <p className="text-sm text-gray-600 mt-2">Order ID: #VK{Math.floor(Math.random() * 10000)}</p>
          <p className="text-sm text-gray-600">Total: ₹{getTotalPrice()}</p>
        </div>
        <button
          onClick={() => {
            setShowPaymentSuccess(false);
            setCart([]);
            onNavigate('home');
          }}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Payment Method</h3>
        
        <div className="space-y-4">
          <button 
            onClick={() => handlePaymentSelect('UPI Payment')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6" />
                <span className="font-semibold">UPI Payment</span>
              </div>
              <span className="text-sm">Instant</span>
            </div>
          </button>
          
          <button 
            onClick={() => handlePaymentSelect('Cash on Delivery')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6" />
                <span className="font-semibold">Cash on Delivery</span>
              </div>
              <span className="text-sm">Pay Later</span>
            </div>
          </button>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => setShowPaymentOptions(false)}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Buy Products</h2>
        </div>
        
        {/* Cart Button */}
        <button
          onClick={() => setShowCart(true)}
          className="relative w-12 h-12 bg-orange-500 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Search Mode Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Search Method</h3>
        <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => {
              setSearchMode('voice');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              searchMode === 'voice' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>Voice Search</span>
          </button>
          <button
            onClick={() => {
              setSearchMode('text');
              window.speechSynthesis.cancel();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              searchMode === 'text' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Type className="w-5 h-5" />
            <span>Text Search</span>
          </button>
        </div>

        {/* Voice Search */}
        {searchMode === 'voice' && (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center ${isAISpeaking ? 'animate-pulse' : ''}`}>
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">AI Voice Search</h4>
                <p className="text-sm text-gray-600">Tell us what you need</p>
              </div>
            </div>

            {/* AI Question Display */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border-2 border-blue-200">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ${isAISpeaking ? 'animate-bounce' : ''}`}>
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-blue-800 font-medium text-lg">{aiQuestion}</p>
                    <button
                      onClick={handleReplayQuestion}
                      className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                      title="Replay question"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {isAISpeaking && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm font-medium">AI is speaking...</span>
                    </div>
                  )}
                  {searchQuery && (
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">U</span>
                      </div>
                      <span className="text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-lg">
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
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
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
                  Tap to Search by Voice
                </span>
              )}
            </button>
          </div>
        )}

        {/* Text Search */}
        {searchMode === 'text' && (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Text Search</h4>
                <p className="text-sm text-gray-600">Type what you're looking for</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleTextSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 5 kg onions, fresh tomatoes..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Products List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Available Products</h3>
        
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.vendor} • {product.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">₹{product.price}/kg</span>
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
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">Call Vendor</span>
              </button>
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="text-sm">Add to Cart</span>
              </button>
              <button
                onClick={() => handleProductSelect(product)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="text-sm">Buy Now</span>
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
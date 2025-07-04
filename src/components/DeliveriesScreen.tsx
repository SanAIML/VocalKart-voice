import React, { useState, useEffect } from 'react';
import { Truck, MapPin, User, Phone, CheckCircle, Clock, ArrowLeft, Volume2 } from 'lucide-react';

interface DeliveriesScreenProps {
  onNavigate: (screen: string) => void;
}

const DeliveriesScreen: React.FC<DeliveriesScreenProps> = ({ onNavigate }) => {
  const [selectedDelivery, setSelectedDelivery] = useState<string>('self');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('How would you like to handle your deliveries today?');

  const deliveryOptions = [
    {
      id: 'self',
      title: 'Self Delivery',
      subtitle: 'Deliver yourself',
      icon: <User className="w-6 h-6" />,
      cost: 'Free',
      time: '30 mins'
    },
    {
      id: 'helper',
      title: 'Local Helper',
      subtitle: 'Assign to helper',
      icon: <Truck className="w-6 h-6" />,
      cost: '₹5-10',
      time: '45 mins'
    }
  ];

  const orders = [
    {
      id: 1,
      customer: 'Geeta Devi',
      items: 'Tomatoes - 3kg',
      distance: '2 km',
      landmark: 'Near water tank',
      status: 'pending',
      otp: '9824',
      amount: 120
    },
    {
      id: 2,
      customer: 'Rajesh Kumar',
      items: 'Onions - 5kg',
      distance: '1.5 km',
      landmark: 'Behind school',
      status: 'delivered',
      otp: '7531',
      amount: 150
    },
    {
      id: 3,
      customer: 'Priya Sharma',
      items: 'Mangoes - 2kg',
      distance: '3 km',
      landmark: 'Near temple',
      status: 'in-transit',
      otp: '4628',
      amount: 160
    }
  ];

  const helpers = [
    {
      id: 1,
      name: 'Suresh Bhai',
      rating: 4.8,
      completedOrders: 45,
      fee: 8,
      distance: '0.5 km',
      available: true
    },
    {
      id: 2,
      name: 'Mukesh Kumar',
      rating: 4.6,
      completedOrders: 32,
      fee: 6,
      distance: '0.8 km',
      available: true
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

  // Auto-speak the initial question
  useEffect(() => {
    setTimeout(() => {
      speakText(aiQuestion);
    }, 500);
  }, []);

  const handleReplayQuestion = () => {
    speakText(aiQuestion);
  };

  const handleDeliveryOptionSelect = (optionId: string) => {
    setSelectedDelivery(optionId);
    const option = deliveryOptions.find(opt => opt.id === optionId);
    if (option) {
      speakText(`You selected ${option.title}. This option costs ${option.cost} and takes about ${option.time}.`);
    }
  };

  const handleStartDelivery = (order: any) => {
    speakText(`Starting delivery for ${order.customer}. The delivery OTP is ${order.otp}. Distance is ${order.distance}.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in-transit': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

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
        <h2 className="text-2xl font-bold text-gray-800">Deliveries</h2>
      </div>

      {/* AI Assistant */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center ${isAISpeaking ? 'animate-pulse' : ''}`}>
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Delivery Assistant</h3>
            <p className="text-sm text-gray-600">Get help with your deliveries</p>
          </div>
        </div>

        {/* AI Question Display */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 mb-4 border-2 border-orange-200">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 ${isAISpeaking ? 'animate-bounce' : ''}`}>
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-orange-800 font-medium text-lg">{aiQuestion}</p>
                <button
                  onClick={handleReplayQuestion}
                  className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                  title="Replay question"
                >
                  <Volume2 className="w-4 h-4 text-white" />
                </button>
              </div>
              {isAISpeaking && (
                <div className="flex items-center space-x-2 text-orange-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm font-medium">AI is speaking...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Method</h3>
        <div className="grid grid-cols-2 gap-4">
          {deliveryOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleDeliveryOptionSelect(option.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedDelivery === option.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedDelivery === option.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.icon}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-800">{option.title}</p>
                  <p className="text-sm text-gray-600">{option.subtitle}</p>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <span className="text-xs text-green-600 font-medium">{option.cost}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{option.time}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Local Helpers (when helper option is selected) */}
      {selectedDelivery === 'helper' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Helpers</h3>
          <div className="space-y-3">
            {helpers.map((helper) => (
              <div key={helper.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{helper.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>★ {helper.rating}</span>
                        <span>•</span>
                        <span>{helper.completedOrders} orders</span>
                        <span>•</span>
                        <span>{helper.distance} away</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{helper.fee}</p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Orders</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{order.customer}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{order.items}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{order.distance}</span>
                    </div>
                    <span>•</span>
                    <span>{order.landmark}</span>
                  </div>
                  {order.status === 'pending' && (
                    <div className="mt-2 bg-white rounded-lg p-2 border border-orange-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Voice OTP:</span> Say "{order.otp}" to confirm delivery
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{order.amount}</p>
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => handleStartDelivery(order)}
                      className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                    >
                      Start Delivery
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Deliveries</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveriesScreen;
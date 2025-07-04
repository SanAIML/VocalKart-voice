import React, { useState, useEffect } from 'react';
import { TrendingUp, Volume2, DollarSign, Package, Calendar, ArrowLeft } from 'lucide-react';

interface SalesAnalyticsScreenProps {
  onNavigate: (screen: string) => void;
}

const SalesAnalyticsScreen: React.FC<SalesAnalyticsScreenProps> = ({ onNavigate }) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('What would you like to know about your sales?');

  const salesData = {
    weeklyEarnings: 1200,
    itemsSold: 6,
    bestSeller: 'Tomatoes',
    totalOrders: 8,
    categories: [
      { name: 'Vegetables', sales: 800, items: 4 },
      { name: 'Fruits', sales: 400, items: 2 }
    ],
    recentSales: [
      { item: 'Tomatoes', quantity: '5 kg', price: 200, date: 'Today' },
      { item: 'Onions', quantity: '3 kg', price: 90, date: 'Yesterday' },
      { item: 'Mangoes', quantity: '2 kg', price: 160, date: '2 days ago' }
    ]
  };

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

  const handleVoiceQuery = () => {
    setIsListening(true);
    setTimeout(() => {
      const query = 'What sold best?';
      setVoiceQuery(query);
      setIsListening(false);
      
      // AI responds with the answer
      setTimeout(() => {
        const response = voiceResponses[query as keyof typeof voiceResponses];
        speakText(response);
      }, 1000);
    }, 2000);
  };

  const handleReplayQuestion = () => {
    speakText(aiQuestion);
  };

  const handleCategoryDetails = (category: any) => {
    const response = `In ${category.name}, you sold ${category.items} items for a total of ${category.sales} rupees this week.`;
    speakText(response);
  };

  const voiceResponses = {
    'What sold best?': 'Tomatoes were your best seller with 5 kg sold this week.',
    'How much did I earn last month?': 'You earned ₹4,800 last month.',
    'Give sales report for bananas': 'You sold 3 kg of bananas for ₹150 this week.'
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
        <h2 className="text-2xl font-bold text-gray-800">Sales & Analytics</h2>
      </div>

      {/* Voice Query */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center ${isAISpeaking ? 'animate-pulse' : ''}`}>
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Sales Assistant</h3>
            <p className="text-sm text-gray-600">Ask about your sales performance</p>
          </div>
        </div>

        {/* AI Question Display */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-4 border-2 border-purple-200">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 ${isAISpeaking ? 'animate-bounce' : ''}`}>
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-purple-800 font-medium text-lg">{aiQuestion}</p>
                <button
                  onClick={handleReplayQuestion}
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  title="Replay question"
                >
                  <Volume2 className="w-4 h-4 text-white" />
                </button>
              </div>
              {isAISpeaking && (
                <div className="flex items-center space-x-2 text-purple-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm font-medium">AI is speaking...</span>
                </div>
              )}
              {voiceQuery && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">U</span>
                    </div>
                    <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-lg">"{voiceQuery}"</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <span className="text-purple-800 bg-purple-50 px-3 py-2 rounded-lg">{voiceResponses[voiceQuery as keyof typeof voiceResponses]}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleVoiceQuery}
          disabled={isListening || isAISpeaking}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
            isListening || isAISpeaking
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
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
              <Volume2 className="w-5 h-5 mr-2" />
              Ask Voice Question
            </span>
          )}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weekly Earnings</p>
              <p className="text-2xl font-bold text-green-600">₹{salesData.weeklyEarnings}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Items Sold</p>
              <p className="text-2xl font-bold text-blue-600">{salesData.itemsSold}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Best Seller</p>
              <p className="text-lg font-bold text-orange-600">{salesData.bestSeller}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-purple-600">{salesData.totalOrders}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Performance</h3>
        <div className="space-y-4">
          {salesData.categories.map((category, index) => (
            <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.items} items sold</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{category.sales}</p>
                  <button 
                    onClick={() => handleCategoryDetails(category)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Volume2 className="w-3 h-3 mr-1" />
                    Hear Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
        <div className="space-y-3">
          {salesData.recentSales.map((sale, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800">{sale.item}</p>
                <p className="text-sm text-gray-600">{sale.quantity} • {sale.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹{sale.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsScreen;
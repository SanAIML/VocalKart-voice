import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, Book, Video, Headphones, ChevronRight } from 'lucide-react';

interface HelpSupportScreenProps {
  onNavigate: (screen: string) => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onNavigate }) => {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const supportOptions = [
    {
      id: 'call',
      title: 'Call Support',
      subtitle: 'Speak directly with our team',
      icon: <Phone className="w-6 h-6" />,
      color: 'from-green-400 to-green-600',
      action: () => window.open('tel:+918001234567')
    },
    {
      id: 'chat',
      title: 'Live Chat',
      subtitle: 'Chat with support agent',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600',
      action: () => {}
    },
    {
      id: 'video',
      title: 'Video Tutorial',
      subtitle: 'Watch how-to videos',
      icon: <Video className="w-6 h-6" />,
      color: 'from-purple-400 to-purple-600',
      action: () => {}
    },
    {
      id: 'voice',
      title: 'Voice Help',
      subtitle: 'Audio instructions',
      icon: <Headphones className="w-6 h-6" />,
      color: 'from-orange-400 to-orange-600',
      action: () => {}
    }
  ];

  const faqs = [
    {
      question: 'How do I add a product using voice?',
      answer: 'Tap the "Add Product by Voice" button and follow the voice prompts. Speak clearly when asked about your product name, price, quantity, and category.'
    },
    {
      question: 'How do I change the language?',
      answer: 'Tap the language toggle in the top right corner of the home screen. Select your preferred language from Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, or English.'
    },
    {
      question: 'How does voice ordering work?',
      answer: 'Go to "Buy Products" and tap the voice search button. Say what you want to buy, like "5 kg onions". The app will show nearby vendors with that product.'
    },
    {
      question: 'How do I track my deliveries?',
      answer: 'Go to the Deliveries section to see all your current orders. You can choose self-delivery or assign to a local helper.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We support UPI payments and Cash on Delivery. Choose your preferred method during checkout.'
    },
    {
      question: 'How do I complete KYC verification?',
      answer: 'Go to Profile & KYC section and upload your Aadhaar card photo. Verification usually takes 24-48 hours.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with VocalKart',
      duration: '3 min',
      thumbnail: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Adding Products by Voice',
      duration: '2 min',
      thumbnail: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Voice Shopping Guide',
      duration: '4 min',
      thumbnail: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

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
        <h2 className="text-2xl font-bold text-gray-800">Help & Support</h2>
      </div>

      {/* Quick Support Options */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Get Help Now</h3>
        <div className="grid grid-cols-2 gap-4">
          {supportOptions.map((option) => (
            <button
              key={option.id}
              onClick={option.action}
              className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center text-white`}>
                  {option.icon}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-800 text-sm">{option.title}</p>
                  <p className="text-xs text-gray-600">{option.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Support</h3>
        <p className="text-red-600 text-sm mb-4">For urgent issues or technical problems</p>
        <button
          onClick={() => window.open('tel:+918001234567')}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg flex items-center justify-center"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Emergency Support
        </button>
      </div>

      {/* Video Tutorials */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Video className="w-5 h-5 mr-2" />
          Video Tutorials
        </h3>
        <div className="space-y-3">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:from-purple-100 hover:to-blue-100 transition-all cursor-pointer">
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{tutorial.title}</p>
                <p className="text-xs text-gray-600">{tutorial.duration}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Book className="w-5 h-5 mr-2" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${selectedFAQ === index ? 'rotate-90' : ''}`} />
              </button>
              {selectedFAQ === index && (
                <div className="px-4 pb-4 text-sm text-gray-600 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Support Helpline</p>
              <p className="font-semibold text-gray-800">+91 800-123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">WhatsApp Support</p>
              <p className="font-semibold text-gray-800">+91 800-123-4568</p>
            </div>
          </div>
        </div>
      </div>

      {/* Language Support */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Multilingual Support</h3>
        <p className="text-gray-600 text-sm mb-4">Our support team speaks your language!</p>
        <div className="grid grid-cols-4 gap-2">
          {['🇮🇳 Hindi', '🇮🇳 Marathi', '🇮🇳 Tamil', '🇮🇳 Telugu', '🇮🇳 Kannada', '🇮🇳 Bengali', '🇺🇸 English'].map((lang, index) => (
            <div key={index} className="text-xs text-center py-2 bg-white rounded-lg border border-amber-200">
              {lang}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSupportScreen;
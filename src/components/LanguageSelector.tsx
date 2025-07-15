import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.name === currentLanguage) || languages[0];

  const handleLanguageSelect = (language: any) => {
    onLanguageChange(language.name);
    setIsOpen(false);
    
    // Speak language change confirmation
    if ('speechSynthesis' in window) {
      const confirmations = {
        'English': 'Language changed to English',
        'हिंदी': 'भाषा हिंदी में बदल गई',
        'मराठी': 'भाषा मराठीत बदलली',
        'தமிழ்': 'மொழி தமிழுக்கு மாற்றப்பட்டது',
        'తెలుగు': 'భాష తెలుగుకు మార్చబడింది',
        'ಕನ್ನಡ': 'ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
        'বাংলা': 'ভাষা বাংলায় পরিবর্তিত হয়েছে'
      };
      
      const utterance = new SpeechSynthesisUtterance(confirmations[language.name as keyof typeof confirmations]);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-xl shadow-sm px-4 py-2 hover:shadow-md transition-all duration-200 border"
        style={{ borderColor: '#3CAEA3' }}
      >
        <Globe className="w-5 h-5" style={{ color: '#20639B' }} />
        <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50" style={{ borderColor: '#3CAEA3' }}>
          <div className="p-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                  currentLanguage === language.name 
                    ? 'text-white' 
                    : 'hover:bg-gray-50'
                }`}
                style={{ 
                  backgroundColor: currentLanguage === language.name ? '#3CAEA3' : 'transparent',
                  color: currentLanguage === language.name ? 'white' : '#1A1A1A'
                }}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
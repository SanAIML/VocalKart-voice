import React, { useState } from 'react';
import { User, Camera, Shield, CheckCircle, Clock, Phone, MapPin, ArrowLeft } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected'>('verified');
  const [profileData, setProfileData] = useState({
    name: 'Ramesh Kumar',
    village: 'Sultanpur',
    shopType: 'Vegetable Vendor',
    phone: '+91 9876543210',
    aadhaar: '****-****-1234'
  });

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <Shield className="w-4 h-4" />;
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
        <h2 className="text-2xl font-bold text-gray-800">Profile & KYC</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/8867533/pexels-photo-8867533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Profile"
                className="w-18 h-18 rounded-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{profileData.name}</h3>
            <p className="text-gray-600">{profileData.shopType}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getKycStatusColor(kycStatus)}`}>
                {getKycStatusIcon(kycStatus)}
                <span className="capitalize">{kycStatus === 'verified' ? 'KYC Verified' : `KYC ${kycStatus}`}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-semibold text-gray-800">{profileData.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Village</p>
                <p className="font-semibold text-gray-800">{profileData.village}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Aadhaar Number</p>
                <p className="font-semibold text-gray-800">{profileData.aadhaar}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          KYC Verification
        </h3>
        
        {kycStatus === 'verified' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Verification Complete</p>
                <p className="text-sm text-green-600">Your account is fully verified and ready to use</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-800">Verification Pending</p>
                  <p className="text-sm text-yellow-600">Please upload your Aadhaar card to complete verification</p>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
              <div className="flex items-center justify-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Upload Aadhaar Card</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Voice Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Settings</h3>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Voice Pattern</p>
                <p className="text-sm text-gray-600">Stored for biometric validation</p>
              </div>
              <span className="text-green-600 font-medium">✓ Recorded</span>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
            <span>Update Voice Pattern</span>
          </button>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-blue-600">₹5,240</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Products Listed</p>
            <p className="text-2xl font-bold text-green-600">12</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Completed Orders</p>
            <p className="text-2xl font-bold text-orange-600">28</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Customer Rating</p>
            <p className="text-2xl font-bold text-purple-600">4.8★</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
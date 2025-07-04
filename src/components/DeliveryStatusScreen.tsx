import React, { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, Package, Phone, ArrowLeft, Star, MessageCircle } from 'lucide-react';

interface DeliveryStatusScreenProps {
  onNavigate: (screen: string) => void;
}

const DeliveryStatusScreen: React.FC<DeliveryStatusScreenProps> = ({ onNavigate }) => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      orderNumber: 'VK1001',
      vendor: 'Ramu Bhaiya\'s Shop',
      vendorPhone: '+91 9876543210',
      items: [
        { name: 'Fresh Onions', quantity: '3 kg', price: 90 },
        { name: 'Potatoes', quantity: '2 kg', price: 60 }
      ],
      total: 150,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-15',
      deliveryTime: '2:30 PM',
      paymentMethod: 'Cash on Delivery',
      deliveryAddress: 'Near Water Tank, Sultanpur Village',
      rating: 5,
      feedback: 'Fresh vegetables, good quality!'
    },
    {
      id: 2,
      orderNumber: 'VK1002',
      vendor: 'Geeta Devi\'s Farm',
      vendorPhone: '+91 9876543211',
      items: [
        { name: 'Organic Tomatoes', quantity: '2 kg', price: 80 }
      ],
      total: 80,
      status: 'in-transit',
      orderDate: '2024-01-16',
      estimatedDelivery: '2024-01-16',
      estimatedTime: '4:00 PM',
      paymentMethod: 'UPI Payment',
      deliveryAddress: 'Behind School, Sultanpur Village',
      trackingSteps: [
        { step: 'Order Confirmed', completed: true, time: '1:00 PM' },
        { step: 'Preparing Order', completed: true, time: '1:30 PM' },
        { step: 'Out for Delivery', completed: true, time: '3:00 PM' },
        { step: 'Delivered', completed: false, time: 'Expected 4:00 PM' }
      ]
    },
    {
      id: 3,
      orderNumber: 'VK1003',
      vendor: 'Krishnan Uncle\'s Garden',
      vendorPhone: '+91 9876543212',
      items: [
        { name: 'Sweet Mangoes', quantity: '1 kg', price: 80 }
      ],
      total: 80,
      status: 'pending',
      orderDate: '2024-01-16',
      estimatedDelivery: '2024-01-17',
      estimatedTime: '11:00 AM',
      paymentMethod: 'Cash on Delivery',
      deliveryAddress: 'Near Temple, Sultanpur Village'
    }
  ];

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
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Confirmed';
      case 'in-transit': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  const handleCallVendor = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const OrderDetailModal = ({ order }: { order: any }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[600px] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Order Details</h3>
              <p className="text-orange-100 text-sm">#{order.orderNumber}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="font-medium">{getStatusText(order.status)}</span>
            </div>
          </div>

          {/* Tracking Steps (for in-transit orders) */}
          {order.status === 'in-transit' && order.trackingSteps && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Order Tracking</h4>
              <div className="space-y-3">
                {order.trackingSteps.map((step: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${step.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                        {step.step}
                      </p>
                      <p className="text-xs text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vendor Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Vendor</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{order.vendor}</span>
              <button
                onClick={() => handleCallVendor(order.vendorPhone)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </button>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Items Ordered</h4>
            <div className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.quantity}</p>
                  </div>
                  <span className="font-bold text-green-600">₹{item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-green-600">₹{order.total}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Delivery Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{order.deliveryAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  {order.status === 'delivered' 
                    ? `Delivered on ${order.deliveryDate} at ${order.deliveryTime}`
                    : `Expected ${order.estimatedDelivery} at ${order.estimatedTime}`
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Payment</h4>
            <span className="text-gray-700">{order.paymentMethod}</span>
          </div>

          {/* Rating & Feedback (for delivered orders) */}
          {order.status === 'delivered' && order.rating && (
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Your Review</h4>
              <div className="flex items-center space-x-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < order.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600">({order.rating}/5)</span>
              </div>
              {order.feedback && (
                <p className="text-sm text-gray-700 italic">"{order.feedback}"</p>
              )}
            </div>
          )}
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
        <h2 className="text-2xl font-bold text-gray-800">Delivery Status</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
          <div className="text-center">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="text-center">
            <p className="text-sm text-gray-600">In Transit</p>
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'in-transit').length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="text-center">
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Orders</h3>
        
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">#{order.orderNumber}</h4>
                <p className="text-sm text-gray-600">{order.vendor}</p>
                <p className="text-xs text-gray-500">Ordered on {order.orderDate}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </span>
                <p className="text-lg font-bold text-green-600 mt-1">₹{order.total}</p>
              </div>
            </div>

            {/* Items Preview */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                    {item.name} ({item.quantity})
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{order.deliveryAddress}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <Clock className="w-4 h-4" />
                <span>
                  {order.status === 'delivered' 
                    ? `Delivered ${order.deliveryDate} at ${order.deliveryTime}`
                    : `Expected ${order.estimatedDelivery} at ${order.estimatedTime}`
                  }
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedOrder(order.id)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                View Details
              </button>
              <button
                onClick={() => handleCallVendor(order.vendorPhone)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-xl text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Phone className="w-4 h-4" />
                <span>Call Vendor</span>
              </button>
              {order.status === 'delivered' && (
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-xl text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Review</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal order={orders.find(o => o.id === selectedOrder)} />
      )}
    </div>
  );
};

export default DeliveryStatusScreen;
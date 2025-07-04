import React, { useState } from 'react';
import { Package, Edit, Trash2, Eye, ArrowLeft, Plus, TrendingUp, Star, MapPin } from 'lucide-react';

interface ItemsListedScreenProps {
  onNavigate: (screen: string) => void;
}

const ItemsListedScreen: React.FC<ItemsListedScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      name: 'Fresh Onions',
      category: 'Vegetables',
      price: 30,
      quantity: 15,
      originalQuantity: 20,
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Fresh, locally grown onions',
      dateAdded: '2024-01-10',
      status: 'active',
      views: 45,
      inquiries: 8,
      sold: 5,
      rating: 4.5,
      reviews: [
        { customer: 'Geeta Devi', rating: 5, comment: 'Very fresh onions!', date: '2024-01-15' },
        { customer: 'Rajesh Kumar', rating: 4, comment: 'Good quality', date: '2024-01-14' }
      ]
    },
    {
      id: 2,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 40,
      quantity: 8,
      originalQuantity: 12,
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Organic, pesticide-free tomatoes',
      dateAdded: '2024-01-12',
      status: 'active',
      views: 32,
      inquiries: 6,
      sold: 4,
      rating: 4.8,
      reviews: [
        { customer: 'Priya Sharma', rating: 5, comment: 'Excellent organic tomatoes!', date: '2024-01-16' }
      ]
    },
    {
      id: 3,
      name: 'Sweet Mangoes',
      category: 'Fruits',
      price: 80,
      quantity: 0,
      originalQuantity: 10,
      image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Sweet, ripe mangoes',
      dateAdded: '2024-01-08',
      status: 'sold-out',
      views: 67,
      inquiries: 12,
      sold: 10,
      rating: 4.9,
      reviews: [
        { customer: 'Mukesh Bhai', rating: 5, comment: 'Best mangoes in the village!', date: '2024-01-13' },
        { customer: 'Sunita Devi', rating: 5, comment: 'Very sweet and juicy', date: '2024-01-11' }
      ]
    },
    {
      id: 4,
      name: 'Fresh Potatoes',
      category: 'Vegetables',
      price: 25,
      quantity: 18,
      originalQuantity: 25,
      image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Farm fresh potatoes',
      dateAdded: '2024-01-14',
      status: 'active',
      views: 28,
      inquiries: 4,
      sold: 7,
      rating: 4.3,
      reviews: []
    }
  ];

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'sold-out': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'sold-out': return 'Sold Out';
      case 'inactive': return 'Inactive';
      default: return 'Unknown';
    }
  };

  const ProductDetailModal = ({ product }: { product: any }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[600px] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-yellow-100 text-sm">{product.category}</p>
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 rounded-xl object-cover mx-auto mb-4"
            />
            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
              <span>{getStatusText(product.status)}</span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-xl font-bold text-green-600">₹{product.price}/kg</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-xl font-bold text-blue-600">{product.quantity} kg</p>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Performance</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{product.views}</p>
                <p className="text-xs text-gray-600">Views</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{product.inquiries}</p>
                <p className="text-xs text-gray-600">Inquiries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{product.sold} kg</p>
                <p className="text-xs text-gray-600">Sold</p>
              </div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="bg-yellow-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Customer Reviews</h4>
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-sm text-gray-600">({product.reviews.length} reviews)</span>
            </div>
            
            {product.reviews.length > 0 ? (
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {product.reviews.map((review: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800 text-sm">{review.customer}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                    <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No reviews yet</p>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Additional Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date Added:</span>
                <span className="text-gray-800">{product.dateAdded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Original Quantity:</span>
                <span className="text-gray-800">{product.originalQuantity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sold Percentage:</span>
                <span className="text-gray-800">{Math.round((product.sold / product.originalQuantity) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-1">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-1">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Items Listed</h2>
        </div>
        <button
          onClick={() => onNavigate('add-product')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-green-600">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">{products.reduce((sum, p) => sum + p.views, 0)}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {selectedCategory === 'all' ? 'All Products' : selectedCategory} 
          <span className="text-gray-500 ml-2">({filteredProducts.length})</span>
        </h3>
        
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                    <p className="text-xs text-gray-600">per kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{product.quantity}</p>
                    <p className="text-xs text-gray-600">kg left</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{product.views}</p>
                    <p className="text-xs text-gray-600">views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-orange-600">{product.sold}</p>
                    <p className="text-xs text-gray-600">kg sold</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews.length} reviews)</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Stock Progress</span>
                    <span>{Math.round((product.sold / product.originalQuantity) * 100)}% sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${(product.sold / product.originalQuantity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-xl text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-1">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-xl text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Boost</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} />
      )}
    </div>
  );
};

export default ItemsListedScreen;
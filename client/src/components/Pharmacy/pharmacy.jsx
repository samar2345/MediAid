import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ShoppingBag, 
  Filter, 
  X,
  Heart,
  ChevronRight,
  Calendar,
  Pill,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';

const PharmacyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('nearby');
  const [filters, setFilters] = useState({
    emergency: false,
    delivery: false,
    highestRated: false,
    nearestFirst: false
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for pharmacies
  const pharmacies = [
    {
      id: 1,
      name: "LifeCare Pharmacy",
      distance: 0.8,
      address: "123 Main Street, Downtown",
      phone: "+1 555-123-4567",
      rating: 4.8,
      hours: "Open 24/7",
      isEmergency: true,
      hasDelivery: true,
      image: "https://images.unsplash.com/photo-1586015555747-5510f0489124?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      name: "MediPlus Drugstore",
      distance: 1.2,
      address: "456 Oak Avenue, Westside",
      phone: "+1 555-987-6543",
      rating: 4.5,
      hours: "Open until 10PM",
      isEmergency: true,
      hasDelivery: true,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      name: "QuickMeds Pharmacy",
      distance: 2.5,
      address: "789 Pine Road, Eastside",
      phone: "+1 555-567-8901",
      rating: 4.2,
      hours: "Open until 9PM",
      isEmergency: false,
      hasDelivery: true,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];
  
  // Mock data for medications with better images
  const medications = [
    {
      id: 1,
      name: "Emergency First Aid Kit",
      price: "$29.99",
      category: "Emergency",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Complete kit with essential first aid supplies for emergency situations."
    },
    {
      id: 2,
      name: "Aspirin 325mg",
      price: "$8.99",
      category: "Pain Relief",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Effective pain reliever for headaches, minor pain and fever reduction."
    },
    {
      id: 3,
      name: "Antibiotic Ointment",
      price: "$12.50",
      category: "First Aid",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Helps prevent infection in minor cuts, scrapes and burns."
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      price: "$49.99",
      category: "Medical Devices",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1580281657702-257584239a42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Digital device for accurate blood pressure measurements at home."
    },
    {
      id: 5,
      name: "Epinephrine Auto-Injector",
      price: "$375.00",
      category: "Emergency",
      prescription: true,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1603721544197-fba87d1d7b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Emergency treatment for severe allergic reactions."
    },
    {
      id: 6,
      name: "Digital Thermometer",
      price: "$15.99",
      category: "Medical Devices",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Fast and accurate temperature readings with digital display."
    },
    {
      id: 7,
      name: "Allergy Relief Tablets",
      price: "$14.75",
      category: "Allergy",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Non-drowsy formula for 24-hour relief from allergy symptoms."
    },
    {
      id: 8,
      name: "Vitamin D3 Supplements",
      price: "$19.95",
      category: "Vitamins",
      prescription: false,
      inStock: true,
      imageUrl: "https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Essential vitamin supplement for bone health and immune support."
    }
  ];

  // All available categories
  const categories = ['all', ...new Set(medications.map(med => med.category))];

  // Advanced filtering function for pharmacies
  const filteredPharmacies = useMemo(() => {
    return pharmacies
      .filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(pharmacy => !filters.emergency || pharmacy.isEmergency)
      .filter(pharmacy => !filters.delivery || pharmacy.hasDelivery)
      .sort((a, b) => {
        if (filters.highestRated) return b.rating - a.rating;
        if (filters.nearestFirst) return a.distance - b.distance;
        return 0;
      });
  }, [pharmacies, searchQuery, filters]);

  // Advanced filtering function for medications
  const filteredMedications = useMemo(() => {
    return medications
      .filter(med => 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(med => selectedCategory === 'all' || med.category === selectedCategory);
  }, [medications, searchQuery, selectedCategory]);

  // Filter modal component
  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter Pharmacies</h2>
          <button 
            onClick={() => setShowFilterModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { key: 'emergency', label: 'Emergency 24/7', icon: <AlertCircle className="h-5 w-5 text-red-500" /> },
            { key: 'delivery', label: 'Delivery Available', icon: <ShoppingBag className="h-5 w-5 text-blue-500" /> },
            { key: 'highestRated', label: 'Highest Rated', icon: <Star className="h-5 w-5 text-yellow-500" /> },
            { key: 'nearestFirst', label: 'Nearest First', icon: <MapPin className="h-5 w-5 text-green-500" /> }
          ].map(({ key, label, icon }) => (
            <div 
              key={key} 
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                {icon}
                <span className="ml-3">{label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowFilterModal(false)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-5 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">MediAid Pharmacy</h1>
            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 text-white opacity-75 hover:opacity-100 cursor-pointer" />
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search pharmacies or medications..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>
      
      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex">
            <button
              className={`flex-1 py-4 text-center font-medium relative ${activeTab === 'nearby' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('nearby')}
            >
              <div className="flex justify-center items-center">
                <MapPin className={`h-5 w-5 mr-2 ${activeTab === 'nearby' ? 'text-blue-600' : 'text-gray-500'}`} />
                Nearby Pharmacies
              </div>
              {activeTab === 'nearby' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
              )}
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium relative ${activeTab === 'medications' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('medications')}
            >
              <div className="flex justify-center items-center">
                <Pill className={`h-5 w-5 mr-2 ${activeTab === 'medications' ? 'text-blue-600' : 'text-gray-500'}`} />
                Medications
              </div>
              {activeTab === 'medications' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Content based on active tab */}
      <div className="flex-1 py-6">
        <div className="max-w-6xl mx-auto px-4">
          {activeTab === 'nearby' ? (
            <>
              {/* Filter options */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto py-2">
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full shadow-sm ${
                    Object.values(filters).some(f => f)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border border-blue-200'
                  } text-sm font-medium whitespace-nowrap`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {Object.values(filters).filter(Boolean).length > 0 && (
                    <span className="ml-1 bg-white text-blue-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                      {Object.values(filters).filter(Boolean).length}
                    </span>
                  )}
                </button>
                
                {/* Active Filters Chips */}
                {Object.entries(filters)
                  .filter(([_, value]) => value)
                  .map(([key]) => {
                    const labels = {
                      emergency: 'Emergency 24/7',
                      delivery: 'Delivery',
                      highestRated: 'Highest Rated',
                      nearestFirst: 'Nearest First'
                    };
                    return (
                      <span 
                        key={key}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center"
                      >
                        {labels[key]}
                        <button 
                          className="ml-2 text-blue-400 hover:text-blue-600"
                          onClick={() => setFilters(prev => ({ ...prev, [key]: false }))}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    );
                  })
                }
              </div>
              
              {/* Pharmacy list */}
              <div className="space-y-6">
                {filteredPharmacies.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No pharmacies found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredPharmacies.map(pharmacy => (
                    <div key={pharmacy.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 bg-gray-200">
                          <img 
                            src={pharmacy.image} 
                            alt={pharmacy.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-xl text-gray-900">{pharmacy.name}</h3>
                              <div className="flex items-center mt-2">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span className="ml-1 text-sm font-medium">{pharmacy.rating}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                  <span>{pharmacy.distance} km away</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 text-sm text-gray-600">
                                <div className="flex items-center mt-2">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                  <span>{pharmacy.address}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                  <span>{pharmacy.phone}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                  <span className={pharmacy.isEmergency ? "text-green-600 font-medium" : ""}>
                                    {pharmacy.hours}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {pharmacy.isEmergency && (
                                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                  Emergency
                                </span>
                              )}
                              {pharmacy.hasDelivery && (
                                <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                  Delivery
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex gap-3">
                            <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                              Call Pharmacy
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition">
                              <Calendar className="h-4 w-4 mr-2" />
                              Order Online
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              {/* Categories for medications */}
              <div className="mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                        selectedCategory === category 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Medications grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMedications.length === 0 ? (
                  <div className="col-span-full bg-white rounded-xl shadow-md p-6 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No medications found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredMedications.map(med => (
                    <div key={med.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img 
                          src={med.imageUrl} 
                          alt={med.name} 
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white shadow-sm text-gray-700">
                            {med.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700">{med.name}</h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{med.description}</p>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-bold text-blue-600 text-lg">{med.price}</span>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center">
                              {med.inStock ? (
                                <>
                                  <Check className="h-4 w-4 text-green-500" />
                                  <span className="ml-1 text-xs text-green-600">In Stock</span>
                                </>
                              ) : (
                                <>
                                  <X className="h-4 w-4 text-red-500" />
                                  <span className="ml-1 text-xs text-red-600">Out of Stock</span>
                                </>
                              )}
                            </div>
                            {med.prescription && (
                              <span className="mt-1 text-xs text-orange-600">Prescription Required</span>
                            )}
                          </div>
                        </div>
                        
                        <button className="w-full mt-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Emergency Action Button */}
      <div className="fixed bottom-20 right-6">
        <button className="h-16 w-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
          SOS
        </button>
      </div>
      
      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 py-3 px-4 flex justify-around shadow-md">
        <button className="flex flex-col items-center">
          <MapPin className="h-6 w-6 text-gray-500" />
          <span className="text-xs text-gray-500 mt-1">Nearby</span>
        </button>
        <button className="flex flex-col items-center">
          <ShoppingBag className="h-6 w-6 text-blue-600" />
          <span className="text-xs text-blue-600 mt-1">Pharmacy</span>
        </button>
        <button className="flex flex-col items-center">
          <Search className="h-6 w-6 text-gray-500" />
          <span className="text-xs text-gray-500 mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
          <span className="text-xs text-gray-500 mt-1">Profile</span>
        </button>
      </nav>

      {/* Filter Modal */}
      {showFilterModal && <FilterModal />}
    </div>
  );
};

export default PharmacyPage;
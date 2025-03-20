import React, { useState, useEffect } from 'react';
import { 
  FaAmbulance, 
  FaHeartbeat, 
  FaCut, 
  FaBrain, 
  FaUserInjured,
  FaMapMarkerAlt,
  FaPhone,
  FaTimes
} from 'react-icons/fa';

const EmergencyModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    contactNumber: ''
  });

  const emergencyTypes = [
    { 
      id: 'medical', 
      name: 'Medical Emergency', 
      icon: FaHeartbeat,
      description: 'Sudden illness, chest pain, breathing difficulties'
    },
    { 
      id: 'accident', 
      name: 'Accident', 
      icon: FaUserInjured,
      description: 'Physical injury, road accident, workplace incident'
    },
    { 
      id: 'trauma', 
      name: 'Trauma', 
      icon: FaCut,
      description: 'Severe injury, bleeding, critical condition'
    },
    { 
      id: 'neurological', 
      name: 'Neurological', 
      icon: FaBrain,
      description: 'Stroke, seizure, sudden neurological symptoms'
    }
  ];

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error("Location error:", error);
          }
        );
      }
    };

    getLocation();
  }, []);

  const handleSubmit = async () => {
    try {
      // Prepare emergency request data
      const emergencyRequest = {
        type: selectedType.id,
        location: location,
        description: formData.description,
        contactNumber: formData.contactNumber
      };

      // TODO: Implement actual API call to submit emergency request
      console.log('Emergency Request:', emergencyRequest);
      
      // Show confirmation and close modal
      alert('Emergency request submitted. Help is on the way!');
      onClose();
    } catch (error) {
      console.error('Emergency submission error:', error);
      alert('Failed to submit emergency request. Please try again.');
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-600 text-center">
              Select Emergency Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type);
                    setStep(2);
                  }}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center 
                    ${selectedType?.id === type.id 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-red-300'
                    }`}
                >
                  <type.icon className="h-8 w-8 text-red-500 mb-2" />
                  <h3 className="font-semibold">{type.name}</h3>
                  <p className="text-xs text-gray-500 text-center">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-600 text-center">
              Confirm Location
            </h2>
            {location ? (
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <FaMapMarkerAlt className="mx-auto text-green-600 h-12 w-12 mb-4" />
                <p className="font-semibold">
                  Location Detected Successfully
                </p>
                <p className="text-gray-600">
                  Latitude: {location.latitude.toFixed(4)}
                  <br />
                  Longitude: {location.longitude.toFixed(4)}
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p>Unable to detect location. Please enter manually.</p>
                <input 
                  type="text" 
                  placeholder="Enter your address"
                  className="w-full p-2 border rounded mt-2"
                />
              </div>
            )}
            <div className="flex space-x-4 justify-center">
              <button 
                onClick={() => setStep(3)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg"
              >
                Confirm Location
              </button>
              <button 
                onClick={() => setStep(1)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg"
              >
                Back
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-600 text-center">
              Emergency Details
            </h2>
            <div className="space-y-4">
              <textarea 
                placeholder="Describe your emergency (Optional)"
                className="w-full p-3 border rounded-lg"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({
                  ...formData, 
                  description: e.target.value
                })}
              />
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="tel" 
                  placeholder="Contact Number"
                  className="w-full p-3 pl-10 border rounded-lg"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({
                    ...formData, 
                    contactNumber: e.target.value
                  })}
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg flex items-center justify-center"
                >
                  <FaAmbulance className="mr-2" /> 
                  Request Emergency Help
                </button>
                <button 
                  onClick={onClose}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        {renderStep()}
      </div>
    </div>
  );
};

export default EmergencyModal;
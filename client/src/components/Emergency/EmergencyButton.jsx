import React, { useState } from 'react';
import { FaAmbulance } from 'react-icons/fa';
import EmergencyModal from './EmergencyModal';

const EmergencyButton = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          onClick={() => setIsEmergencyModalOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-2xl 
          animate-pulse hover:bg-red-700 transition-all duration-300 
          flex items-center justify-center relative"
        >
          <FaAmbulance className="h-[50vh] w-[50vw]" />
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black 
          text-xs rounded-full px-2 py-1">
            Emergency
          </span>
        </button>
      </div>

      {isEmergencyModalOpen && (
        <EmergencyModal 
          onClose={() => setIsEmergencyModalOpen(false)} 
        />
      )}
    </>
  );
};

export default EmergencyButton;
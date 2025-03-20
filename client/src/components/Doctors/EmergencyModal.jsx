// import React, { useState } from 'react';
// import { 
//   FaHeartbeat, 
//   FaCommentMedical, 
//   FaVideoSlash, 
//   FaTimes, 
//   FaComments, 
//   FaVideo 
// } from 'react-icons/fa';

// const EmergencyModal = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     // Additional logic for routing to chat/video chat
//   };

//   // Render nothing if not open
//   if (!isOpen) {
//     return (
//       <button 
//         onClick={() => setIsOpen(true)}
//         className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors animate-pulse flex items-center justify-center text-sm"
//       >
//         <FaHeartbeat className="mr-2" /> Emergency
//       </button>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md shadow-2xl p-8 relative">
//         {/* Close Button */}
//         <button 
//           onClick={() => setIsOpen(false)}
//           className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
//         >
//           <FaTimes className="h-6 w-6" />
//         </button>

//         {/* Modal Content */}
//         <div className="text-center">
//           <FaHeartbeat className="mx-auto h-12 w-12 text-red-500 mb-4" />
//           <h2 className="text-2xl font-bold mb-4 text-gray-800">
//             Emergency Assistance
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Choose your preferred method of communication
//           </p>

//           {/* Communication Options */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Chat Option */}
//             <button 
//               onClick={() => handleOptionSelect('chat')}
//               className="border-2 border-blue-500 rounded-lg p-6 hover:bg-blue-50 transition-colors group"
//             >
//               <FaComments className="mx-auto h-10 w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
//               <h3 className="font-semibold text-blue-600">
//                 Text Chat
//               </h3>
//               <p className="text-xs text-gray-500 mt-2">
//                 Instant messaging with medical professional
//               </p>
//             </button>

//             {/* Video Chat Option */}
//             <button 
//               onClick={() => handleOptionSelect('video')}
//               className="border-2 border-green-500 rounded-lg p-6 hover:bg-green-50 transition-colors group"
//             >
//               <FaVideo className="mx-auto h-10 w-10 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
//               <h3 className="font-semibold text-green-600">
//                 Video Consultation
//               </h3>
//               <p className="text-xs text-gray-500 mt-2">
//                 Live video call with a doctor
//               </p>
//             </button>
//           </div>

//           {/* Additional Information */}
//           <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//             <p className="text-sm text-yellow-700">
//               ⚠️ Our medical professionals are standing by to assist you
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmergencyModal;


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FaHeartbeat, 
  FaComments, 
  FaVideo, 
  FaTimes 
} from 'react-icons/fa';

const EmergencyModal = () => {
  const location = useLocation();
  const doctor = location.state?.doctor; // Extract doctor details
  const [isOpen, setIsOpen] = useState(true); // Open modal by default

  if (!isOpen) return null; // Hide modal when closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl p-8 relative">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <FaHeartbeat className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Emergency Assistance with {doctor?.name || 'Doctor'}
          </h2>
          <p className="text-gray-600 mb-6">
            Choose your preferred method of communication
          </p>

          {/* Communication Options */}
          <div className="grid grid-cols-2 gap-4">
            <button className="border-2 border-blue-500 rounded-lg p-6 hover:bg-blue-50 transition-colors group">
              <FaComments className="mx-auto h-10 w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-blue-600">Text Chat</h3>
            </button>

            <button className="border-2 border-green-500 rounded-lg p-6 hover:bg-green-50 transition-colors group">
              <FaVideo className="mx-auto h-10 w-10 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-green-600">Video Call</h3>
            </button>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-700">
              ⚠️ {doctor?.name || 'Doctor'} is ready to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;

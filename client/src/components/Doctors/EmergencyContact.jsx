// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaComments, 
//   FaVideo, 
//   FaUserMd 
// } from 'react-icons/fa';

// const EmergencyContact = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
//       <div className="flex space-x-8">
//         {/* Chat Card */}
//         <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
//           <FaComments className="mx-auto h-16 w-16 text-blue-500 mb-6" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Text Chat Consultation
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Connect with a medical professional through instant messaging
//           </p>
//           <Link
//             to="/emergencyContact/text-page"
//             className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             <FaComments className="mr-2" />
//             Start Text Chat
//           </Link>
//         </div>

//         {/* Video Call Card */}
//         <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
//           <FaVideo className="mx-auto h-16 w-16 text-green-500 mb-6" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Video Consultation
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Face-to-face consultation with a medical professional
//           </p>
//           <Link
//             to="/emergencyContact/video-page"
//             className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//           >
//             <FaVideo className="mr-2" />
//             Start Video Call
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmergencyContact;



import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaComments, FaVideo } from 'react-icons/fa';

const EmergencyContact = () => {
  const location = useLocation();
  const doctor = location.state?.doctor; // Extract doctor details
  const {id}=useParams();
  console.log(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="flex space-x-8">
        {/* Chat Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
          <FaComments className="mx-auto h-16 w-16 text-blue-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Text Chat Consultation
          </h2>
          <p className="text-gray-600 mb-6">
            Connect with {doctor?.name || 'a medical professional'} through instant messaging.
          </p>
          <Link
            to={`/emergencyContact/text-page/${id}`}
            state={{ doctor }} // Pass doctor details
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaComments className="mr-2" />
            Start Text Chat
          </Link>
        </div>

        {/* Video Call Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
          <FaVideo className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Video Consultation
          </h2>
          <p className="text-gray-600 mb-6">
            Face-to-face consultation with {doctor?.name || 'a medical professional'}.
          </p>
          <Link
            to={`/emergencyContact/video-page/${id}`}
            state={{ doctor }} // Pass doctor details
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaVideo className="mr-2" />
            Start Video Call
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;

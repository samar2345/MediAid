// import React, { useState, useEffect } from 'react';
// import { FaUserMd, FaCalendarAlt, FaClock, FaEnvelope, FaPhone, FaUser, FaNotesMedical } from 'react-icons/fa';
// import { useLocation, useParams } from 'react-router-dom';

// const AppointmentBooking = () => {
//   const location = useLocation();
//   const [doctorEmail, setDoctorEmail] = useState('');
//   const [formData, setFormData] = useState({
//     patientName: '',
//     patientEmail: '',
//     patientPhone: '',
//     appointmentDate: '',
//     appointmentTime: '',
//     medicalCondition: '',
//     additionalNotes: ''
//   });

//   const {id} = useParams();
//   console.log(id);


//   useEffect(() => {
//     // Extract doctor's email from route state or query params
//     const doctor = location.state?.doctor;
//     if (doctor) {
//       setDoctorEmail(doctor.email || '');
//     }
//   }, [location]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Prepare email data
//       const emailData = {
//         to: doctorEmail,
//         subject: `Appointment Request from ${formData.patientName}`,
//         body: `
//           Patient Appointment Details:
          
//           Name: ${formData.patientName}
//           Email: ${formData.patientEmail}
//           Phone: ${formData.patientPhone}
          
//           Appointment Details:
//           Date: ${formData.appointmentDate}
//           Time: ${formData.appointmentTime}
          
//           Medical Condition: ${formData.medicalCondition}
          
//           Additional Notes: ${formData.additionalNotes}
//         `
//       };

//       // Send email (you'll need to implement this backend route)
//       const response = await fetch('/api/send-appointment-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(emailData)
//       });

//       if (response.ok) {
//         // Show success modal or redirect
//         alert('Appointment request sent successfully!');
//         // Reset form or redirect
//       } else {
//         throw new Error('Failed to send appointment request');
//       }
//     } catch (error) {
//       console.error('Appointment booking error:', error);
//       alert('Failed to submit appointment. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6 ">
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
//           Book Appointment
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Doctor Email (Hidden) */}
//           <input 
//             type="hidden" 
//             value={doctorEmail} 
//             readOnly 
//           />

//           {/* Patient Personal Information */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <label className="flex items-center mb-2 text-gray-700">
//                 <FaUser className="mr-2 text-blue-500" /> Patient Name
//               </label>
//               <input 
//                 type="text"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name"
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="flex items-center mb-2 text-gray-700">
//                 <FaEnvelope className="mr-2 text-blue-500" /> Email
//               </label>
//               <input 
//                 type="email"
//                 name="patientEmail"
//                 value={formData.patientEmail}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email"
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <label className="flex items-center mb-2 text-gray-700">
//               <FaPhone className="mr-2 text-blue-500" /> Phone Number
//             </label>
//             <input 
//               type="tel"
//               name="patientPhone"
//               value={formData.patientPhone}
//               onChange={handleInputChange}
//               placeholder="Enter your phone number"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Appointment Details */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <label className="flex items-center mb-2 text-gray-700">
//                 <FaCalendarAlt className="mr-2 text-blue-500" /> Appointment Date
//               </label>
//               <input 
//                 type="date"
//                 name="appointmentDate"
//                 value={formData.appointmentDate}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="flex items-center mb-2 text-gray-700">
//                 <FaClock className="mr-2 text-blue-500" /> Appointment Time
//               </label>
//               <input 
//                 type="time"
//                 name="appointmentTime"
//                 value={formData.appointmentTime}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Medical Information */}
//           <div>
//             <label className="flex items-center mb-2 text-gray-700">
//               <FaNotesMedical className="mr-2 text-blue-500" /> Medical Condition
//             </label>
//             <input 
//               type="text"
//               name="medicalCondition"
//               value={formData.medicalCondition}
//               onChange={handleInputChange}
//               placeholder="Brief description of your medical condition"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Additional Notes */}
//           <div>
//             <label className="flex items-center mb-2 text-gray-700">
//               Additional Notes
//             </label>
//             <textarea 
//               name="additionalNotes"
//               value={formData.additionalNotes}
//               onChange={handleInputChange}
//               placeholder="Any additional information for the doctor"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               rows={4}
//             />
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//           >
//             Book Appointment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AppointmentBooking;


import React, { useState, useEffect } from 'react';
import { FaUserMd, FaCalendarAlt, FaClock, FaEnvelope, FaPhone, FaUser, FaNotesMedical } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';

const AppointmentBooking = () => {
  const location = useLocation();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    medicalCondition: '',
    additionalNotes: ''
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        const data = await response.json();
        console.log('Doctor Details:', data);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    
    fetchDoctorDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailData = {
        to: doctor?.email,
        subject: `Appointment Request from ${formData.patientName}`,
        body: `
          Patient Appointment Details:
          
          Name: ${formData.patientName}
          Email: ${formData.patientEmail}
          Phone: ${formData.patientPhone}
          
          Appointment Details:
          Date: ${formData.appointmentDate}
          Time: ${formData.appointmentTime}
          
          Medical Condition: ${formData.medicalCondition}
          
          Additional Notes: ${formData.additionalNotes}
        `
      };

      const response = await fetch('/api/send-appointment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        alert('Appointment request sent successfully!');
      } else {
        throw new Error('Failed to send appointment request');
      }
    } catch (error) {
      console.error('Appointment booking error:', error);
      alert('Failed to submit appointment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Book Appointment {doctor && `with Dr. ${doctor.name}`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <FaUser className="mr-2 text-blue-500" /> Patient Name
              </label>
              <input 
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <FaEnvelope className="mr-2 text-blue-500" /> Email
              </label>
              <input 
                type="email"
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="flex items-center mb-2 text-gray-700">
              <FaPhone className="mr-2 text-blue-500" /> Phone Number
            </label>
            <input 
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Appointment Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <FaCalendarAlt className="mr-2 text-blue-500" /> Appointment Date
              </label>
              <input 
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center mb-2 text-gray-700">
                <FaClock className="mr-2 text-blue-500" /> Appointment Time
              </label>
              <input 
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;

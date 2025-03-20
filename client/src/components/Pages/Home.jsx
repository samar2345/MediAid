import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAmbulance,
  FaUserMd,
  FaClinicMedical,
  FaPills,
  FaArrowRight,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaHospital,
  FaExclamationTriangle,
} from "react-icons/fa";
import EmergencyModal from "../Emergency/EmergencyModal";

const Home = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);

  const sendSOS = async () => {
    setIsSendingSOS(true);
    console.log("🚨 Sending SOS request...");

    try {
      // Get user's current location
      let location;
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      } catch (error) {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please enable location services.");
        setIsSendingSOS(false);
        return;
      }

      // Send SOS with default user ID
      const response = await fetch("http://localhost:5000/api/sos/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "67d9fa67e33d31a5c1903bcd",
          message: "Emergency! I need immediate medical assistance!",
          location,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Server error:", data.error);
        alert(`Failed to send SOS: ${data.error}`);
        setIsSendingSOS(false);
        return;
      }

      console.log("✅ SOS sent successfully:", data);
      alert(
        "SOS message sent successfully! Emergency services have been notified."
      );
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("Network error! Please check your connection.");
    } finally {
      setIsSendingSOS(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-white"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Emergency Medical
              </span>
              <br />
              <span className="text-gray-900">
                Assistance at Your Fingertips
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get immediate medical help, connect with healthcare professionals,
              and access emergency resources 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Request Emergency Help
                <FaArrowRight className="ml-2" />
              </button>

              <button
                onClick={sendSOS}
                disabled={isSendingSOS}
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingSOS ? "Sending SOS..." : "SOS Alert"}
                <FaExclamationTriangle className="ml-2" />
              </button>

              {isEmergencyModalOpen && (
                <EmergencyModal
                  onClose={() => setIsEmergencyModalOpen(false)}
                />
              )}
              <Link
                to="/doctors"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to provide immediate
            assistance when you need it most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<FaAmbulance />}
              title="Ambulance Service"
              description="Quick ambulance dispatch to your location with real-time tracking"
              color="red"
            />
            <ServiceCard
              icon={<FaUserMd />}
              title="Online Doctors"
              description="Connect with qualified medical professionals 24/7"
              color="blue"
            />
            <ServiceCard
              icon={<FaClinicMedical />}
              title="Emergency Care"
              description="Immediate medical assistance and emergency response"
              color="purple"
            />
            <ServiceCard
              icon={<FaPills />}
              title="Pharmacy"
              description="Quick access to essential medicines with home delivery"
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Emergency Actions Footer */}
      <div className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Resources
          </h2>
          <div className="flex justify-center">
            <Link to="/ambulance-tracking" className="group max-w-md w-full">
              <div className="bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 flex flex-col items-center text-center h-full">
                <div className="p-4 rounded-full bg-red-500 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaAmbulance className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Track Ambulances
                </h3>
                <p className="text-gray-900 mb-6">
                  See available ambulances near your location in real-time
                </p>
                <button className="mt-auto inline-flex items-center px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
                  Track Now <FaMapMarkedAlt className="ml-2" />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div
        className={`inline-block p-4 rounded-full bg-gradient-to-r ${colorClasses[color]} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {React.cloneElement(icon, { className: "h-8 w-8" })}
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
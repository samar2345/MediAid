import React from 'react';
import { FaHospital, FaAmbulance, FaUserMd, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              About MediAid
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Your trusted partner for emergency medical assistance and healthcare services
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Revolutionizing Emergency Healthcare
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              At MediAid, we're committed to providing immediate access to life-saving medical assistance when you need it most.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<FaAmbulance className="h-8 w-8" />}
                title="Rapid Response"
                description="Our ambulance tracking system ensures the quickest possible emergency response times."
                color="red"
              />
              <FeatureCard 
                icon={<FaUserMd className="h-8 w-8" />}
                title="Expert Healthcare"
                description="Connect with qualified medical professionals available 24/7 for consultations."
                color="blue"
              />
              <FeatureCard 
                icon={<FaHeart className="h-8 w-8" />}
                title="Patient-Centered Care"
                description="We put patients first with compassionate, personalized healthcare services."
                color="purple"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                MediAid was founded in 2023 with a simple but powerful vision: to bridge the gap between emergency medical services and patients through technology.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                After witnessing the challenges in emergency response times and healthcare accessibility, our team of healthcare professionals and tech innovators came together to create a solution that could save lives.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Today, MediAid has grown into a comprehensive platform that not only connects patients with ambulances but provides a full spectrum of medical services, from doctor consultations to pharmacy access.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 rounded-2xl overflow-hidden shadow-xl transform transition-all">
              <div className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-white aspect-w-16 aspect-h-9 h-80">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="flex items-center justify-center h-full">
                  <FaHospital className="h-32 w-32 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Leadership Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Dedicated professionals committed to transforming healthcare accessibility
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TeamMember 
              name="Dr. Emily Chen"
              role="Medical Director"
              bio="Board-certified emergency physician with over 15 years of experience in trauma care."
            />
            <TeamMember 
              name="Michael Rodriguez"
              role="Chief Technology Officer"
              bio="Tech innovator with expertise in healthcare systems and real-time tracking solutions."
            />
            <TeamMember 
              name="Sarah Johnson"
              role="Operations Manager"
              bio="Former ambulance dispatcher with deep knowledge of emergency response protocols."
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <ContactInfo 
                icon={<FaPhone />}
                title="Call Us"
                detail="+1 (888) MEDIAID"
              />
              <ContactInfo 
                icon={<FaEnvelope />}
                title="Email Us"
                detail="contact@mediaid.com"
              />
              <ContactInfo 
                icon={<FaMapMarkerAlt />}
                title="Visit Us"
                detail="123 Healthcare Ave, Medical District"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
  };

  return (
    <div className="pt-6">
      <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
        <div className="-mt-6">
          <div className={`inline-flex items-center justify-center p-3 ${colorClasses[color]} rounded-md shadow-lg transform -translate-y-1/2`}>
            {icon}
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 tracking-tight">{title}</h3>
          <p className="mt-4 text-base text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, bio }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 h-32 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
          <FaUserMd className="h-12 w-12 text-blue-600" />
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-blue-600 mb-2">{role}</p>
        <p className="text-gray-500">{bio}</p>
      </div>
    </div>
  );
};

// Contact Info Component
const ContactInfo = ({ icon, title, detail }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-4 rounded-full bg-white text-blue-600 mb-4">
        {React.cloneElement(icon, { className: "h-8 w-8" })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-100">{detail}</p>
    </div>
  );
};

export default About; 
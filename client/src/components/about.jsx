import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, MapPin, Shield, Phone, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">About MediAid</h1>
          <p className="text-xl max-w-2xl mb-8">
            Revolutionizing emergency healthcare with AI-powered solutions that connect patients, doctors, and emergency responders in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Join MediAid
            </Link>
            <Link to="/emergency" className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300">
              Emergency Help
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            MediAid exists to bridge the critical gap in emergency healthcare by providing instant access to medical assistance when every second counts. We believe that with the right technology, we can significantly reduce response times and save countless lives.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
            <p className="text-gray-700 italic">
              "To bridge the gap in emergency healthcare with a smart, AI-powered solution that ensures instant emergency alerts, real-time tracking, medical guidance, and seamless communication between patients, doctors, and emergency responders."
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Instant Emergency Alerts</h3>
              </div>
              <p className="text-gray-600">
                One-tap SOS functionality that immediately notifies emergency services and pre-selected emergency contacts with your precise location.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Real-time Tracking</h3>
              </div>
              <p className="text-gray-600">
                Live location sharing with emergency responders to ensure the fastest possible assistance, even if you're unable to communicate.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">AI-Driven Medical Guidance</h3>
              </div>
              <p className="text-gray-600">
                Step-by-step first aid instructions tailored to the specific emergency situation while professional help is on the way.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Telemedicine Integration</h3>
              </div>
              <p className="text-gray-600">
                Instant text and video consultations with qualified healthcare professionals for immediate medical advice during emergencies.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Medical Profile Access</h3>
              </div>
              <p className="text-gray-600">
                Secure storage of critical medical information that can be instantly accessed by emergency responders with proper authorization.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Pharmacy Network</h3>
              </div>
              <p className="text-gray-600">
                Quick access to nearby pharmacies with emergency medicines, including 24/7 options and delivery services for urgent needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
            <p className="text-lg text-gray-700">Minutes reduced in average emergency response time</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
            <p className="text-lg text-gray-700">User satisfaction rating for emergency assistance</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">50K+</div>
            <p className="text-lg text-gray-700">Lives potentially saved through faster response</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team placeholders - replace with actual team members */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">Team Member {item}</h3>
                  <p className="text-blue-600">Position Title</p>
                  <p className="mt-2 text-gray-600 text-sm">
                    Expert with extensive experience in emergency medicine and healthcare technology.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {/* Partner logos placeholders */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-20 bg-white rounded-lg shadow-md flex items-center justify-center">
              <div className="text-gray-400 font-medium">Partner Logo</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h2>
          <p className="text-xl max-w-2xl mb-8">
            Download MediAid today and be prepared for any medical emergency. Your safety is just one tap away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
              Sign Up Now
            </Link>
            <a href="#learn-more" className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="fixed bottom-20 right-4">
        <Link to="/emergency" className="h-14 w-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
          SOS
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
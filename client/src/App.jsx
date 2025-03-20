import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/NavBar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import EmergencyButton from './components/Emergency/EmergencyButton';
import DoctorsList from './components/Doctors/DoctorsList';
import AppointmentBooking from './components/Doctors/AppointmentBooking';
import EmergencyContact from './components/Doctors/EmergencyContact';
import TextChatPage from './components/Doctors/TextChatPage';
import VideoChatPage from './components/Doctors/VideoChatPage';
import PharmacyPage from './components/Pharmacy/pharmacy';
import WalletPage from './components/WalletPage';
import AmbulanceTracking from './components/Ambulance/AmbulanceTracking';
import Chatbot from './components/Bot.jsx';
import NotFound from './components/Pages/NotFound.jsx';
import Profile from './components/User/Profile.jsx';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './constants/projectConstant';
import axios from 'axios';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading or redirect to login
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

// Guest Route Component (redirect if already authenticated)
const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  
  if (isAuthenticated) {
    // Redirect to the page they came from or home
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  
  return children;
};
import Blogs from './components/Blogs/Blogs';
import BlogsDetail from './components/Blogs/BlogsDetail';
import Resources from './components/Pages/Resources.jsx';

function App() {
  const dispatch = useDispatch();
  const [verifyingToken, setVerifyingToken] = useState(true);
  
  // Check if user is already logged in (token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const verifyToken = async () => {
      if (token) {
        try {
          // Set up axios default headers for authenticated requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user profile using the token
          const { data } = await axios.get('http://localhost:5000/api/auth/profile');
          
          // If successful, dispatch login success
          dispatch({ 
            type: LOGIN_SUCCESS, 
            payload: data 
          });
        } catch (error) {
          console.error("Token verification failed:", error);
          // If token is invalid, clear it
          localStorage.removeItem('token');
          dispatch({ type: LOGIN_FAIL });
        } finally {
          setVerifyingToken(false);
        }
      } else {
        setVerifyingToken(false);
      }
    };
    
    verifyToken();
  }, [dispatch]);

  // Show loading indicator while verifying token
  if (verifyingToken) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-lg">Initializing app...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogsDetail />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/ambulance-tracking" element={<AmbulanceTracking />} />
          
          {/* Auth Routes - Regular routes without GuestRoute wrapper */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes - Only accessible if logged in */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/doctors" element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          } />
          <Route path="/appointmentBooking/:id" element={
            <ProtectedRoute>
              <AppointmentBooking />
            </ProtectedRoute>
          } />
          <Route path="/emergencyContact/:id" element={
            <ProtectedRoute>
              <EmergencyContact />
            </ProtectedRoute>
          } />
          <Route path="/emergencyContact/text-page/:id" element={
            <ProtectedRoute>
              <TextChatPage />
            </ProtectedRoute>
          } />
          <Route path="/emergencyContact/video-page/:id" element={
            <ProtectedRoute>
              <VideoChatPage />
            </ProtectedRoute>
          } />
          <Route path="/wallet" element={
            <ProtectedRoute>
              <WalletPage />
            </ProtectedRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot /> {/* Floating chatbot available everywhere */}
      </div>
    </Router>
  );
}

export default App;
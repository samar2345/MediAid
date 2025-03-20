import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaUserMd, FaEdit, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../actions/projectAction';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile API call would go here
    console.log('Updated profile:', userData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-lg">
                <FaUser size={48} />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                <p className="flex items-center mt-1">
                  <FaUserMd className="mr-2" />
                  {user?.role || 'Patient'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-50 transition"
              >
                <FaEdit className="mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-red-600 transition"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Full Name</p>
                    <p className="flex items-center text-lg">
                      <FaUser className="mr-2 text-blue-500" />
                      {user?.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="flex items-center text-lg">
                      <FaEnvelope className="mr-2 text-blue-500" />
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="flex items-center text-lg">
                      <FaPhone className="mr-2 text-blue-500" />
                      {user?.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Role</p>
                    <p className="flex items-center text-lg">
                      <FaUserMd className="mr-2 text-blue-500" />
                      {user?.role || 'Patient'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Account Security</h2>
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition">
                  <FaKey className="mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 
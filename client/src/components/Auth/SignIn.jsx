import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaApple, FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/projectAction";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading: authLoading, error: authError } = useSelector((state) => state.auth);

  // Get the intended destination after login
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User authenticated, redirecting to:", from);
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  // Update local loading state based on auth loading
  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  // Set error message from Redux state
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    
    dispatch(login(formData.email, formData.password));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white shadow-2xl rounded-2xl p-10 border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg flex items-center gap-2">
            <FaExclamationCircle />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-300"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button 
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
              Google
            </button>
            <button 
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <FaApple className="h-5 w-5 text-black mr-2" />
              Apple
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

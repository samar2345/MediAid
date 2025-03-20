// import axios from 'axios';
// import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/projectConstant";

// // Register user
// export const register = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: REGISTER_REQUEST });

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     // Replace with your API endpoint
//     const { data } = await axios.post(
//       'http://localhost:5000/api/auth/register',
//       userData,
//       config
//     );

//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: data.user,
//     });

//     localStorage.setItem('token', data.token);
//   } catch (error) {
//     dispatch({
//       type: REGISTER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Login user
// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: LOGIN_REQUEST });

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     // Replace with your API endpoint
//     const { data } = await axios.post(
//       'http://localhost:5000/api/auth/login',
//       { email, password },
//       config
//     );

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: data.user,
//     });

//     localStorage.setItem('token', data.token);
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Logout user
// export const logout = () => async (dispatch) => {
//   localStorage.removeItem('token');
//   dispatch({ type: LOGOUT });
// };

// // Clear Errors
// export const clearErrors = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };

import axios from "axios";
import {
  CLEAR_ERRORS,
  FETCH_DOCTORS_FAIL,
  FETCH_DOCTORS_REQUEST,
  FETCH_DOCTORS_SUCCESS,
  FILTER_DOCTORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/projectConstant";

const API_URL = "http://localhost:5000/api/auth"; // Base API URL

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    console.log("Sending registration data:", userData);

    const { data } = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    
    return data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error);
    
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
    
    throw error;
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    console.log("Login attempt with email:", email);

    const { data } = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login successful, user data received");

    // Set token in localStorage for future authenticated requests
    localStorage.setItem("token", data.token);
    
    // Set Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    // Dispatch success action with user data
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    });
    
    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed. Check your credentials."
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    // Optional: Call logout API if you want to invalidate tokens on server
    await axios.get(`${API_URL}/logout`);
    
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout failed", error);
    // Still remove token from localStorage even if server logout fails
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};




// Action to fetch all doctors
export const fetchDoctors = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DOCTORS_REQUEST });

    const { data } = await axios.get('http://localhost:5000/api/doctors/all');

    dispatch({
      type: FETCH_DOCTORS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DOCTORS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Action to filter doctors
export const filterDoctors = (filters) => ({
  type: FILTER_DOCTORS,
  payload: filters,
});
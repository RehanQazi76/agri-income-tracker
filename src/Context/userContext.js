import axios from 'axios';
import { useEffect } from 'react';

// Set up Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/',
});

// Set up Axios interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage or other source
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set token in request headers
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

export { axiosInstance}; // Export the Axios instance with the interceptor

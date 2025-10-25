import axios from "axios";

/**
 * Create an axios instance with default configuration
 * @param {Object} user - Firebase user object
 * @returns {Promise<Object>} - Configured axios instance
 */
export const createAuthorizedAxiosInstance = async (user) => {
  // Get Firebase ID token
  const idToken = await user.getIdToken();
  
  // Create axios instance with authorization header
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  });
  
  return instance;
};

/**
 * Make an authorized API request
 * @param {Object} user - Firebase user object
 * @param {string} method - HTTP method (get, post, put, delete)
 * @param {string} url - API endpoint
 * @param {Object} data - Request data (for POST/PUT)
 * @returns {Promise<Object>} - API response
 */
export const makeAuthorizedRequest = async (user, method, url, data = null) => {
  try {
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Make request with authorization header
    const config = {
      method,
      url: `${import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com'}${url}`,
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Re-throw the error so it can be handled by the calling function
    throw error;
  }
};
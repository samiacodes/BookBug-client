import { useContext, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import axios from "axios";

const useApi = () => {
  const { user } = useContext(AuthContext);

  const makeRequest = useCallback(async (method, url, data = null) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      // Get fresh token for each request
      const token = await user.getIdToken(true); // force refresh
      
      const config = {
        method,
        url: `${import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com'}${url}`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data
      };
      
      const response = await axios(config);
      return response.data;
    } catch (error) {
      // Handle token expiration
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.warn("Token might be expired, forcing refresh");
        try {
          // Try one more time with a forced token refresh
          const freshToken = await user.getIdToken(true);
          const config = {
            method,
            url: `${import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com'}${url}`,
            headers: {
              'Authorization': `Bearer ${freshToken}`
            },
            data
          };
          
          const response = await axios(config);
          return response.data;
        } catch (refreshError) {
          throw refreshError;
        }
      }
      throw error;
    }
  }, [user]);

  const get = useCallback((url) => makeRequest('get', url), [makeRequest]);
  const post = useCallback((url, data) => makeRequest('post', url, data), [makeRequest]);
  const put = useCallback((url, data) => makeRequest('put', url, data), [makeRequest]);
  const del = useCallback((url) => makeRequest('delete', url), [makeRequest]);

  return { get, post, put, delete: del };
};

export default useApi;
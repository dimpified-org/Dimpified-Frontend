
import axios from "axios";
import api from "../api/authApis";

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addSubscriber(callback) {
  refreshSubscribers.push(callback);
}

const AxiosInterceptor = (dispatch, navigate) => {
  const authFetch = axios.create({
    withCredentials: true,
  });

  // Request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      // Check if googleCredential exists in localStorage
      const googleToken = localStorage.getItem('googleCredential');
      
      if (googleToken) {
        // GOOGLE FLOW: Add token to request body
        if (config.data) {
          // If config.data is a string (JSON), parse it first
          if (typeof config.data === 'string') {
            try {
              const parsedData = JSON.parse(config.data);
              parsedData.token = googleToken;
              config.data = JSON.stringify(parsedData);
            } catch (e) {
              // If parsing fails, create new object
              config.data = JSON.stringify({ 
                ...JSON.parse(config.data || '{}'), 
                token: googleToken 
              });
            }
          } else {
            // If config.data is an object, add token directly
            config.data.token = googleToken;
          }
        } else {
          // If no data exists, create new data object with token
          config.data = { token: googleToken };
        }
        
        console.log('Using Google credential in body');
      } else {
        // NORMAL FLOW: Use Authorization header with accessToken
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        // Handle refresh token in headers
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          config.headers["Refresh-Token"] = `Bearer ${refreshToken}`;
        }
        
        console.log('Using normal auth in header');
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  authFetch.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // Check if this request was using Google credential
        const hasGoogleToken = localStorage.getItem('googleCredential');
        
        if (hasGoogleToken) {
          // GOOGLE FLOW: Clear token and redirect
          console.error('Google token expired or invalid');
          localStorage.removeItem('googleCredential');
          if (navigate) navigate("/auth/login");
          return Promise.reject({ ...error, isGoogleTokenExpired: true });
        } else {
          // NORMAL FLOW: Try to refresh the token
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            console.error('No refresh token available');
            if (navigate) navigate("/auth/login");
            return Promise.reject(error);
          }

          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const newAccessToken = await api.refreshAccessToken(
                refreshToken,
                dispatch
              );

              if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                isRefreshing = false;
                onRefreshed(newAccessToken);
                
                return authFetch({
                  ...originalRequest,
                  headers: {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                });
              } else {
                if (navigate) navigate("/auth/login");
              }
            } catch (refreshError) {
              console.error("Token refresh failed", refreshError);
              isRefreshing = false;
              if (navigate) navigate("/auth/login");
            }
          }

          return new Promise((resolve) => {
            addSubscriber((newToken) => {
              resolve(
                authFetch({
                  ...originalRequest,
                  headers: {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newToken}`,
                  },
                })
              );
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return authFetch;
};

export default AxiosInterceptor;
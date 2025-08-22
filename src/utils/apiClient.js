


import axios from "axios";

console.log('Current environment:', import.meta.env.MODE);
console.log('API Base URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Log all requests
api.interceptors.request.use(config => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Log all responses
api.interceptors.response.use(
  response => {
    console.log('Response:', response.config.url, response.status);
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.error('Response Error:', {
      url: originalRequest?.url,
      status: error.response?.status,
      message: error.message
    });

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Attempting token refresh...');
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        console.log('Token refresh successful');
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;





































// import axios from "axios";

// console.log('API Base URL:', import.meta.env.VITE_API_URL);

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, 
// });

// // Optional: global error interceptor (you can expand to handle 401, etc.)
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config || {};
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !original._retry &&
//       !original.url.includes("/auth/login") &&
//       !original.url.includes("/auth/signup")
//     ) {
//       original._retry = true;
//       try {
//         await api.post("/auth/refresh");
//         return api(original);
//       } catch (_) {
//         // refresh failed, just reject
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     console.log('Request:', {
//       url: config.url,
//       method: config.method,
//       baseURL: config.baseURL,
//       headers: config.headers,
//       params: config.params,
//       data: config.data
//     });
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// export default api;

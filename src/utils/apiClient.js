import axios from "axios";

console.log('API Base URL:', import.meta.env.VITE_API_URL || "http://localhost:9000/api");

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9000/api",
  withCredentials: true, 
});

// Optional: global error interceptor (you can expand to handle 401, etc.)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    if (
      error.response &&
      error.response.status === 401 &&
      !original._retry &&
      !original.url.includes("/auth/login") &&
      !original.url.includes("/auth/signup")
    ) {
      original._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch (_) {
        // refresh failed, just reject
      }
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      headers: config.headers,
      params: config.params,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // important for httpOnly cookies
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

export default api;

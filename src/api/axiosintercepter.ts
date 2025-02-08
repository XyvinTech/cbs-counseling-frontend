import axios from "axios";

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string;
    readonly VITE_API_KEY: string;
    readonly VITE_AUTH_TOKEN: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const baseURL =
  import.meta.env.VITE_APP_API_URL 

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =localStorage.getItem("token");
    const apiKey = import.meta.env.VITE_API_KEY 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers["api-key"] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

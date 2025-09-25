import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { jsToPythonKeys, pythonToJsKeys } from "@/utils";

import { setToken } from "@/reducers/authSlice";
import { addAlert } from "@/reducers/alertsSlice";
import { store } from "@/store";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

const noAuthUrls: readonly string[] = [
  "/auth/register",
  "/auth/token",
] as const;

// Create parity for Python and JS keys naming conventions
// Convert request data keys from camel case to snake case
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string | null = localStorage.getItem("token");
    const url: string = config.url ?? "";

    if (token && !noAuthUrls.includes(url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data) {
      config.data = jsToPythonKeys(config.data);
    }

    return config;
  },
  (error: AxiosError): Promise<never> => {
    console.error("Request interceptor error:", error);

    if (error.response?.status === 401) {
      store.dispatch(setToken(null));
    } else {
      const errorMessage: string = error.message ?? "Request failed";
      store.dispatch(addAlert({ type: "error", message: errorMessage }));
    }

    return Promise.reject(error);
  }
);

// Convert response data keys from snake case to camel case
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.data) {
      if (Array.isArray(response.data)) {
        response.data = response.data.map((item: unknown) =>
          pythonToJsKeys(item)
        );
      } else if (typeof response.data === "object") {
        response.data = pythonToJsKeys(response.data);
      }
    }

    return response;
  },
  (error: AxiosError): Promise<never> => {
    console.error("Response interceptor error:", error);

    if (error.response?.status === 401) {
      store.dispatch(setToken(null));
      localStorage.removeItem("token");
    } else {
      const errorMessage: string = error.message ?? "Request failed";
      store.dispatch(addAlert({ type: "error", message: errorMessage }));
    }

    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
import { jsToPythonKeys, pythonToJsKeys } from "@/utils";

import { addAlert } from "@/reducers/alertsSlice";
import { store } from "@/store";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

const noAuthUrls = ["/auth/register", "/auth/token"];

// Create parity for Python and JS keys naming conventions
// Convert request data keys from camel case to snake case
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const url = config.url || "";

    if (token && !noAuthUrls.includes(url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.data = jsToPythonKeys(config.data);

    return config;
  },
  function (error) {
    // passes all error message to Alert Component
    store.dispatch(addAlert({ type: "error", message: error.message || "" }));
    return Promise.reject(error);
  }
);

// Convert response data keys from snake case to camel case
api.interceptors.response.use(
  function (response) {
    if (Array.isArray(response.data)) {
      response.data.map(pythonToJsKeys);
    } else {
      response.data = pythonToJsKeys(response.data);
    }

    return response;
  },
  function (error) {
    // passes all error message to Alert Component
    store.dispatch(addAlert({ type: "error", message: error.message || "" }));
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
import { jsToPythonKeys, pythonToJsKeys } from "./utils";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// Create parity for Python and JS keys naming conventions
// Convert request data keys from camel case to snake case
api.interceptors.request.use(
  function (config) {
    config.data = jsToPythonKeys(config.data);
    return config;
  },
  function (error) {
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
    return Promise.reject(error);
  }
);

export default api;

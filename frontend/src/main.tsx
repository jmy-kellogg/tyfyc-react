import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import Login from "./containers/Login";
import Logout from "./components/Logout.tsx";
import Alerts from "./components/Alerts.tsx";
import { persistor, store } from "./store";
import { AuthProvider } from "./context/AuthProvider.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Alerts />
        </AuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

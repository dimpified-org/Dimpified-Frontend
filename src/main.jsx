import "./analytics/mixpanel";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "flowbite";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { registerPWA } from "./pwa";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_KEY;
registerPWA();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
            <ToastContainer />
          </Router>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);

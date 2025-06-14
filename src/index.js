import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <CartProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();

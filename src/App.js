import React from "react";
import Index from "./pages/Index";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./assets/css/style.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;

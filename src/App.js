import React from "react";
import Index from "./pages/Index";
import { AuthProvider } from "./context/AuthContext";
//Css
import "./assets/css/style.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import { CartProvider } from "./context/CartContext";
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

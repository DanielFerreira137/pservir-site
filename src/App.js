import React from 'react';
import Index from './pages/Index';	
import { AuthProvider } from './context/AuthContext';
//Css 
import "./assets/css/style.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";

function App() {
	return (
		<div className="App">		
			<AuthProvider>
				<Index />
			</AuthProvider>	
			
		</div>	
	);
}

export default App;

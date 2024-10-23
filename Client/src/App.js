import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CustomUserScreen from './screens/CustomUserScreen';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PricingScreen from './screens/PricingScreen';

// Your Stripe public key (get this from your Stripe dashboard)
//const stripePromise = loadStripe('pk_test_51PgQiFC39bb601vJn7f3Hu7A1UrcDwUXodNoxy8rL8YY2AbyIuJ0HH0xAl5p4JCEZlSCutglnGOr3bzVlu2hAYlJ00kIM8Tr2a');

function App() {
  const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact/>
      
      <Route path="/welcome" element={<WelcomeScreen />} exact/>
        <Route path="/all-pricing-plans" element={<PricingScreen />} exact/>
        {/*<Route path="/payment" element={<PaymentScreen />} exact/>*/}
      <Route path="/profile" element={<ProfileScreen />} exact/>
  
        
        <Route path="/custom" element={<CustomUserScreen/>} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import ForgetPassword from './pages/forgetPassword.jsx';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

import ProductPage from './pages/productPage.jsx';
import ProductOverview from './pages/productOverview.jsx';
import Cart from './pages/cart.jsx';
import Checkout from './pages/checkout.jsx';
import Setting from './pages/settings.jsx';
import AboutUs from './pages/aboutUs.jsx';
import ContactUs from './pages/contactUs.jsx';
import MyOrders from './pages/myOrders.jsx';

function App() {
  return (
    <BrowserRouter>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

        <Toaster position="top-right" />

        <div className="w-full min-h-screen">

          <Routes>

            
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/overview/:id" element={<ProductOverview />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />

           
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />

            
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            
            <Route path="/settings" element={<Setting />} />

            <Route path="/my-orders" element={<MyOrders />} />

            
            <Route path="/admin/*" element={<AdminPage />} />

           
            <Route path="*" element={<h1>404 Not Found</h1>} />

          </Routes>

        </div>

      </GoogleOAuthProvider>

    </BrowserRouter>
  );
}

export default App;
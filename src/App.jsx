import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Signup from "./components/LoginPopup/signup";
import Login from "./components/LoginPopup/LoginPopup";
import Navbar from './components/Navbar';
import Cart from './pages/Cart/Cart';
import Home from "./pages/Home/Home";
import Order from './pages/PlaceOrder/Order';

const App = () => {
  const location = useLocation(); // Get the current location

  // Determine if the current path is for login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      <div className={isAuthPage ? 'applogin' : 'app'}>
        {/* Render Navbar only if not on login or signup page */}
        {!isAuthPage && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        {/* Render Footer only if not on login or signup page */}
        {!isAuthPage && <Footer />}
      </div>
    </>
  );
}

export default App;

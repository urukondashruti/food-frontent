// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { assets } from './../assets/assets';
import { FaCartArrowDown } from "react-icons/fa";
import Cookies from 'js-cookie';
import './Navbar/Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Use selector to get total cart amount from Redux
  const totalCartAmount = useSelector((state) => {
    const cartItems = state.cart.cartItems;
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = state.food.items.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  });

  // Handle sign-out
  const handleSignOut = () => {
    Cookies.remove('jwt_token'); // Adjust the cookie name if needed
    navigate('/login'); // Redirect to login page
  };

  // Update the active menu item based on location pathname
  useEffect(() => {
    if (location.pathname === '/home') {
      setMenu("home");
    } else if (location.pathname === '/cart') {
      setMenu("cart");
    } else {
      setMenu("");
    }
  }, [location.pathname]);

  return (
    <div className='navbar'>
      <Link to='/home'><img src={assets.logo} alt="Logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/home" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        {(menu === "home" || menu === "menu" || menu === "mobile-app") && (
          <div className="navbar-menu">
            <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
            <a href="#app-download" onClick={() => setMenu("mobile-app")} className={`${menu === "mobile-app" ? "active" : ""} ml-5`}>mobile-app</a>
          </div>
        )}
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart' onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : ""}>
            <FaCartArrowDown style={{ width: '30px', height: '30px' }} />
          </Link>
        </div>
        <button onClick={handleSignOut}>sign out</button>
      </div>
    </div>
  );
};

export default Navbar;

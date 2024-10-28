import React, { useState, useEffect } from 'react';
import AppDownload from '../../components/AppDownload/AppDownload';
import Menu from '../../components/ExploreMenu/Menu';
import { FoodDisplay } from '../../components/FoodDisplay/FoodDisplay';
import Header from '../../components/Header/Header';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT token is set in cookies
    const token = Cookies.get("jwt_token");
    if (!token) {
      // If token is not found, redirect to signup page
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <Menu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;

// components/FoodDisplay.js
import React from 'react';
import { useSelector } from 'react-redux';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

export const FoodDisplay = ({ category }) => {
  // Use Redux to get the food list
  const foodList = useSelector((state) => state.food.items);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near to you</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

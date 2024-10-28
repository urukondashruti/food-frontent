// components/PlaceOrder.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  
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

  return (
    <form action="" className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        
        <div className="multi-field">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        
        <div className="multi-field">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>

        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${totalCartAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalCartAmount === 0 ? 0 : totalCartAmount + 2}</b>
            </div>
          </div>
          <button type="button" onClick={() => navigate('/order')}>Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

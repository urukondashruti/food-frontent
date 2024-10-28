// components/Cart.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../store/cartSlice'; // Import the removeFromCart action
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use selectors to access state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const foodList = useSelector((state) => state.food.items); // Access food items from Redux

  // Calculate total amount using getTotalCartAmount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        <br />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-items-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p className="cross" onClick={() => dispatch(removeFromCart(item._id))}>x</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <hr />
      <div className="card-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

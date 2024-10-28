// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { food_list } from '../assets/assets';

const initialState = {
  cartItems: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] > 1) {
        state.cartItems[itemId]--;
      } else {
        delete state.cartItems[itemId];
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import foodReducer from "./foodListSlice";
import authReducer from "./LoginSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    food: foodReducer,
  },
});

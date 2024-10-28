// store/foodSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { food_list } from '../assets/assets';

const initialState = {
  items: food_list, // Use your existing food data from assets
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
});

export default foodSlice.reducer;

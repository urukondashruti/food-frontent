// store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        errors: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("jwt_token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Assuming the response includes user data
                state.token = action.payload.jwt_token;
                Cookies.set('jwt_token', action.payload.jwt_token, { expires: 7 });
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.login_msg || "Login failed. Please try again.";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

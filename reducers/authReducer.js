import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    username: null,
    email: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLogin = true;
        },
        logout: (state, action) => {
            state.username = null;
            state.isLogin = false;
            state.email = null;
            state.token = null;
        }
    }
})


export const { login, logout } = authSlice.actions

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    username: null,
    email: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isLogin = true;
        },
        logout: (state, action) => {
            state.user = null;
            state.isLogin = false;
        }
    }
})


export const { login, logout } = authSlice.actions

export default authSlice.reducer
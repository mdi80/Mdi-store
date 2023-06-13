import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    networkError: false,
}

const authSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.networkError = action.payload.networkError;
        }
    }
})


export const { setError } = authSlice.actions

export default authSlice.reducer
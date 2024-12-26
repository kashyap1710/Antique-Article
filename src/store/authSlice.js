import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
    initialState: {
        status : false,
        userData : null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.stauts = false;
        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;
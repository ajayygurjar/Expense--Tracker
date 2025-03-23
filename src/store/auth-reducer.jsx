import { createSlice } from "@reduxjs/toolkit";


const initialState={isLoggedIn:false,
    token:null,
    email:null};


const authSlice=createSlice({
    name:'Authentication',
    initialState:initialState,
    reducers:{
        handleLogIn(state,action){
            state.isLoggedIn=true;
            state.token=action.payload.token;
            state.email=action.payload.email;
            localStorage.setItem('token',state.token)
            localStorage.setItem('email',state.email)

        },
        handleLogOut(state){
            state.isLoggedIn=false;
            state.token=null;
            state.email=null
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;
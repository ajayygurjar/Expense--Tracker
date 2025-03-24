import { createSlice } from "@reduxjs/toolkit";
 
 const initialState = { isLoggedIn: false, token: "", userID: "" };
 
 const authSlice = createSlice({
 	name: "authentication",
 	initialState: initialState,
 	reducers: {
 		handleLogIn(state, action) {
 			state.isLoggedIn = true;
 			state.token = action.payload.token;
 			state.userID = action.payload.userID;
 		},
 		handleLogout(state) {
 			state.token = null;
 			state.userID = null;
 			state.isLoggedIn = false;
 		},
 	},
 });
 
 export const authActions = authSlice.actions;
 
 export default authSlice.reducer;
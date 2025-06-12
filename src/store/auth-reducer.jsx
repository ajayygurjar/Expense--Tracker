import { createSlice } from "@reduxjs/toolkit";

const persistedToken = localStorage.getItem("token");
const persistedUserID = localStorage.getItem("userID");

const initialState = {
  isLoggedIn: persistedToken ? true : false,
  token: persistedToken || "",
  userID: persistedUserID || "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    handleLogIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userID", action.payload.userID);
    },
    handleLogout(state) {
      state.token = null;
      state.userID = null;
      state.isLoggedIn = false;
	  localStorage.removeItem("token");
  localStorage.removeItem("userID");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
 
 const initialState = { expenseList: [] };
 const expenseSlice = createSlice({
 	name: "expense",
 	initialState: initialState,
 	reducers: {
 		addtoExpenseList(state, action) {
 			state.expenseList = [...state.expenseList, action.payload];
 		},
 		fetchExpenseList(state, action) {
 			state.expenseList = action.payload;
 		},
 		expenseDeleteHandler(state, action) {
 			state.expenseList = state.expenseList.filter(
 				(item) => item.id !== action.payload,
 			);
 		},
 	},
 });
 
 export const expenseActions = expenseSlice.actions;
 
 export default expenseSlice.reducer;
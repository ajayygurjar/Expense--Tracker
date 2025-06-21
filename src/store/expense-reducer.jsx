import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenseList: [], totalExpense: 0 };
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    addtoExpenseList(state, action) {
      state.expenseList = [...state.expenseList, action.payload];
      state.totalExpense += +action.payload.amount;
    },
    fetchExpenseList(state, action) {
      state.expenseList = action.payload;
      state.totalExpense = action.payload.reduce(
        (acc, curr) => acc + +curr.amount,
        0
      );
    },
    expenseDeleteHandler(state, action) {
      const removedExpense = state.expenseList.find(
        (item) => item.id === action.payload
      );
      if (removedExpense) {
        state.totalExpense -= +removedExpense.amount;
      }
      state.expenseList = state.expenseList.filter(
        (item) => item.id !== action.payload
      );
    },
    updateExpenseList(state, action) {
      const updatedExpense = action.payload;
      const oldExpense = state.expenseList.find(
        (expense) => expense.id === updatedExpense.id
      );
      if (oldExpense) {
        state.totalExpense =
          state.totalExpense - +oldExpense.amount + +updatedExpense.amount;
      }
      state.expenseList = state.expenseList.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      );
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;

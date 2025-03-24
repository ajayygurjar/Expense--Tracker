import React, { useCallback, useEffect } from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense-reducer";

const RTDB_URL = `https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

const ExpensePage = () => {
	
	const dispatch = useDispatch();
	const fetchExpenseList = useCallback(async () => {
		try {
			const response = await axios.get(`${RTDB_URL}.json`);
			
			
			const fetchList = Object.keys(response.data).map((key) => {
				return { ...response.data[key], id: key };
			});
			
			
			dispatch(expenseActions.fetchExpenseList(fetchList));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchExpenseList();
	}, [fetchExpenseList]);

	const expenseList = useSelector((state) => state.expense.expenseList);
	const totalExpense = expenseList.reduce((acc, curr) => {
		return acc + +curr.amount;
	}, 0);
	

	return (
		<>
			<ExpenseForm />
			<ExpenseList />
			{totalExpense > 10000 && (
				<button
					style={{
						borderRadius: "0.375rem",
						backgroundColor: "#b45309",
						padding: "0.25rem 0.5rem",
					}}
				>
					Activate Premium
				</button>
			)}
		</>
	);
};

export default ExpensePage;

import React, { useCallback, useEffect,useState } from "react";
import ExpenseForm from "../components/ExpenseTrack/ExpenseForm";
import ExpenseList from "../components/ExpenseTrack/ExpenseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense-reducer";
import { themeActions } from "../store/theme-reducer";

const RTDB_URL = `https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

const ExpensePage = () => {
  const dispatch = useDispatch();
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  
  const fetchExpenseList = useCallback(async () => {
    try {
      const response = await axios.get(`${RTDB_URL}.json`);
      const fetchList = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      dispatch(expenseActions.fetchExpenseList(fetchList));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchExpenseList();
  }, [fetchExpenseList]);


  const handleEditExpenseData = (expense) => {
    setExpenseToEdit(expense);
  };

  const handleEditSuccess = () => {
    setExpenseToEdit(null); // Reset after successful edit
    fetchExpenseList(); // Refetch the list to reflect changes
  };

  
  const expenseList = useSelector((state) => state.expense.expenseList);
  const totalExpense = expenseList.reduce((acc, curr) => acc + +curr.amount, 0);

  
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  
  const handlePremiumActivation = () => {
    dispatch(themeActions.togglePremium());
    dispatch(themeActions.themeToggle()); 
  };

  

  // Function to download expenses as CSV
  const downloadCSV = () => {
    const csvData = [
      ["ID", "Amount", "Description", "Category"],
      ...expenseList.map((item) => [item.id, item.amount, item.description, item.category]),
    ];

    const csvContent = csvData
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "expenses.csv";
    link.click();
  };

  return (
    <div className={isDarkMode ? "dark-theme" : "light-theme"}>
      <ExpenseForm expenseToEdit={expenseToEdit} onEditSuccess={handleEditSuccess} />
      <ExpenseList handleEditExpenseData={handleEditExpenseData} />
      
      {/* Button to activate Premium */}
      {totalExpense > 10000 &&  (
        <button
          onClick={handlePremiumActivation}
          style={{
            borderRadius: "0.375rem",
            backgroundColor: "#b45309",
            padding: "0.25rem 0.5rem",
          }}
        >
          Activate Premium
        </button>
      )}
      
      
      {/* Download CSV button */}
      <button
        onClick={downloadCSV}
        style={{
          borderRadius: "0.375rem",
          backgroundColor: "#28a745",
          padding: "0.25rem 0.5rem",
          marginTop: "10px",
        }}
      >
        Download Expenses as CSV
      </button>
    </div>
  );
};

export default ExpensePage;

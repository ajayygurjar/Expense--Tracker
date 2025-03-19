import { useState, useEffect } from "react";
import useExpense from "../../store/expense-context";

const options = [
  "Grocery",
  "Petrol",
  "Salary",
  "Electricity",
  "Movies",
  "Shopping",
];

const ExpenseForm = () => {
  const { setExpense, addExpense, expenseUpdateHandler, editExpense, setEditExpense } = useExpense();
  const { amount, setAmount, description, setDescription, category, setCategory } = setExpense;

  const handleExpense = (e) => {
    e.preventDefault();

    const expense = {
      amount: amount,
      description: description,
      category: category,
    };

    
    if (editExpense) {
      expenseUpdateHandler(expense, editExpense.id);
    } else {
      addExpense(expense);  
    }

    
    setAmount("");         
    setDescription("");    
    setCategory("");       

    
    if (editExpense) {
      setEditExpense(null);
    }
  };

  
  useEffect(() => {
    if (editExpense) {
      setAmount(editExpense.amount);
      setDescription(editExpense.description);
      setCategory(editExpense.category);
    } else {
      
      setAmount("");
      setDescription("");
      setCategory("");
    }
  }, [editExpense]);

  return (
    <form onSubmit={handleExpense}>
      <div>
        <label htmlFor="expense">Expense Amount</label>
        <input
          id="expense"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="expense-description">Description of Expense</label>
        <input
          id="expense-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <select value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button type="submit">{editExpense ? "Update" : "Add"} Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

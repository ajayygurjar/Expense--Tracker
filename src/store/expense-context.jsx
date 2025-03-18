import React, { useContext, useState } from "react";

const ExpenseContext=React.createContext();


export const ExpenseContextProvider=(props)=>{

    const [expenseList,setExpenseList]=useState([]);

    const addExpense=(expense)=>{
        setExpenseList((prev)=>[...prev,expense])


    }




    const context={addExpense,expenseList}

    return <ExpenseContext.Provider value={context}>{props.children}</ExpenseContext.Provider>

}


const useExpense=()=>useContext(ExpenseContext);
export default useExpense;

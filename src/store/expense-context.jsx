import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const ExpenseContext=React.createContext();



const RTDB_URL=`https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app//userExpense`

export const ExpenseContextProvider=(props)=>{

    const [expenseList,setExpenseList]=useState([]);

    const addExpense=async(expense)=>{
        try{
            const response=await axios.post(`${RTDB_URL}.json`,expense);
            setExpenseList((prev)=>[
                ...prev,{...expense,id:response.data.name}
            ])
        }catch(error){
            console.log(error.response.data);
        }


    }


    const fetchExpenseList=useCallback(async()=>{
        try {
            const response=await axios.get(`${RTDB_URL}.json`);
            const fetchList=Object.keys(response.data).map((key)=>{
                return {...response.data[key],id:key};
        })
        setExpenseList(fetchList);
        } catch (error) {
            console.log(error)
        }
    },[]);


    useEffect(()=>{
        fetchExpenseList();
    },[fetchExpenseList]);





    const context={addExpense,expenseList,fetchExpenseList}

    return <ExpenseContext.Provider value={context}>{props.children}</ExpenseContext.Provider>

}


const useExpense=()=>useContext(ExpenseContext);
export default useExpense;

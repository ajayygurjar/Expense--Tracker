import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const ExpenseContext=React.createContext();



const RTDB_URL=`https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app//userExpense`

export const ExpenseContextProvider=(props)=>{
    const [amount, setAmount] = useState("");
 	const [description, setDescription] = useState("");
 	const [category, setCategory] = useState("");
    const [editExpense,setEditExpense]=useState()



    const [expenseList,setExpenseList]=useState([]);

    const addExpense=useCallback(async(expense)=>{
        try{
            const response=await axios.post(`${RTDB_URL}.json`,expense);
            setExpenseList((prev)=>[
                ...prev,{...expense,id:response.data.name}
            ])
        }catch(error){
            console.log(error.response.data);
        }


    },[])


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


    const expenseDeleteHandler=async(id)=>{
        try {
            const response=await axios.delete(`${RTDB_URL}/${id}.json`);
         
            if(response.status===200){
                setExpenseList((prev)=>{
                    return prev.filter((item)=>item.id !== id)
                })
                console.log(`delete successfully`)

        }
        }
        
        catch (error) {
            console.log(error)
            
        }
    }


    const expenseUpdateHandler=useCallback(async(updateItem,id)=>{
        try {
            const response=await axios.put(`${RTDB_URL}/${id}.json`,updateItem)
            setExpenseList((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, ...updateItem } : item
                )
            );
            
            console.log(`update successfully`)
        } catch (error) {
            console.log(error);
        }
    })


    const handleEditExpense=(item)=>{
        setEditExpense(item);
        setAmount(item.amount);
        setDescription(item.description);
        setCategory(item.category);
    }



    const context={addExpense,expenseList,fetchExpenseList,setExpense:{
        amount,setAmount,description,setDescription,category,setCategory
    },expenseDeleteHandler,expenseUpdateHandler,handleEditExpense,editExpense,setEditExpense}

    return <ExpenseContext.Provider value={context}>{props.children}</ExpenseContext.Provider>

}


const useExpense=()=>useContext(ExpenseContext);
export default useExpense;

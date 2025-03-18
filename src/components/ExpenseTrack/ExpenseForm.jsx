import { useState } from "react";
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

    const {addExpense}=useExpense()

    const [amount,setAmount]=useState('');
    const [description,setDescription]=useState('')
    const [category,setCategory]=useState('')

    const handleExpense=(e)=>{
        e.preventDefault();

        const  expense={
            amount:amount,
            description:description,
            category:category,
        }
        console.log(expense);
        addExpense(expense)
    }




    return (
        <>
            <form onSubmit={handleExpense}>
                <div>
                    <label htmlFor="expense">Expense Amount</label>
                    <input id="expense" type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}  required/>
                </div>
                <div>
                    <label htmlFor="expense-description">Description of Expense</label>
                    <input id="expense-description" type="text"  value={description} onChange={(e)=>setDescription(e.target.value)} required/>
                </div>
                <div>
                    <select value={category} id="category" onChange={(e)=>setCategory(e.target.value)} >
                        <option value="" disabled>Select an option</option>
                        {options.map((option, index) => {
                            
                            return (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ExpenseForm;

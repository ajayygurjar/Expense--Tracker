import useExpense from "../../store/expense-context";

const ExpenseList = () => {
    const { expenseList, expenseDeleteHandler, handleEditExpense } =
 		useExpense();
 
 	
 
 	const handleDelete = (id) => {
 		expenseDeleteHandler(id);
 	};
 
 	const handleEdit = (item) => {
 		
 		handleEditExpense(item);
 	};

    return (
        <>
            <ul>
                {expenseList.map((expense, index) => (
                    <li key={index}>
                        <span>${expense.amount} </span>
                        <span>{expense.description} </span>
                        <span>{expense.category} </span>
                        <button onClick={()=>handleDelete(expense.id)}>Delete</button>
                        <button onClick={()=>handleEdit(expense)}>Edit</button>
                         
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;

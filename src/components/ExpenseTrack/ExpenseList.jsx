import useExpense from "../../store/expense-context";

const ExpenseList = () => {
    const { expenseList } = useExpense();

    return (
        <>
            <ul>
                {expenseList.map((expense, index) => (
                    <li key={index}>
                        <span>${expense.amount} </span>
                        <span>{expense.description} </span>
                        <span>{expense.category} </span>
                         
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;

import {  useEffect } from "react";
import { Container, Form, Button ,Row,Col} from "react-bootstrap";
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

  return (  <Container className="mt-4">
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Form onSubmit={handleExpense}>
          <Form.Group className="mb-3" controlId="formExpenseAmount">
            <Form.Label>Expense Amount</Form.Label>
            <Form.Control
              id="expense"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter expense amount"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formExpenseDescription">
            <Form.Label>Description of Expense</Form.Label>
            <Form.Control
              id="expense-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formExpenseCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {editExpense ? "Update" : "Add"} Expense
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default ExpenseForm;

import React, { useState, useCallback,useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
import axios from "axios";

const RTDB_URL = `https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

const options = [
  "Grocery",
  "Petrol",
  "Salary",
  "Electricity",
  "Movies",
  "Shopping",
];

const ExpenseForm = ({expenseToEdit,onEditSuccess}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState(""); 
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);






  const handleExpense = (e) => {
    e.preventDefault();

    const expense = {
      amount: amount,
      description: description, 
      category: category,
    };
   
    if (expenseToEdit) {
      updateExpense(expense);
    } else {
      addtoExpenseList(expense);
    }

    setAmount("");
    setDescription("");
    setCategory("");
  }

  const addtoExpenseList = useCallback(
    async (item) => {
      try {
        const response = await axios.post(`${RTDB_URL}.json`, item);
        console.log(response.status, response.statusText, "Expense ADD success");
        dispatch(
          expenseActions.addtoExpenseList({
            ...item,
            id: response.data.name,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  
  const updateExpense = async (item) => {
    try {
      await axios.put(`${RTDB_URL}/${expenseToEdit.id}.json`, item);
      dispatch(
        expenseActions.updateExpenseList({
          ...item,
          id: expenseToEdit.id,
        })
      );
      if (onEditSuccess) onEditSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form onSubmit={handleExpense}>
            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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
            {expenseToEdit ? "Update Expense" : "Add Expense"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;

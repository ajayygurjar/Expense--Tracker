// ExpenseForm.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { expenseActions } from "../../store/expense-reducer";

const RTDB_URL = `https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

const options = ["Grocery", "Petrol", "Salary", "Electricity", "Movies", "Shopping"];

const ExpenseForm = ({ show, handleClose, expenseToEdit, onEditSuccess }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
    } else {
      setAmount("");
      setDescription("");
      setCategory("");
    }
  }, [expenseToEdit]);

  const handleExpense = async (e) => {
    e.preventDefault();
    const expense = { amount, description, category };

    try {
      if (expenseToEdit) {
        await axios.put(`${RTDB_URL}/${expenseToEdit.id}.json`, expense);
        dispatch(expenseActions.updateExpenseList({ ...expense, id: expenseToEdit.id }));
      } else {
        const response = await axios.post(`${RTDB_URL}.json`, expense);
        dispatch(expenseActions.addtoExpenseList({ ...expense, id: response.data.name }));
      }

      onEditSuccess();      // Callback to parent
      handleClose();        // Close modal
    } catch (error) {
      console.error("Failed to submit expense", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{expenseToEdit ? "Edit Expense" : "Add Expense"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleExpense}>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            {expenseToEdit ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseForm;

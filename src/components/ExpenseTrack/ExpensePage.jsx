import { Container, Row, Col, Button, Card } from "react-bootstrap"

import  { useCallback, useEffect,useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
import { themeActions } from "../../store/theme-reducer";

const RTDB_URL = `https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;

const ExpensePage = () => {
  const dispatch = useDispatch();
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  
  const fetchExpenseList = useCallback(async () => {
    try {
      const response = await axios.get(`${RTDB_URL}.json`);
      const fetchList = Object.keys(response.data).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      dispatch(expenseActions.fetchExpenseList(fetchList));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchExpenseList();
  }, [fetchExpenseList]);


  const handleEditExpenseData = (expense) => {
    setExpenseToEdit(expense);
  };

  const handleEditSuccess = () => {
    setExpenseToEdit(null); // Reset after successful edit
    fetchExpenseList(); // Refetch the list to reflect changes
  };

  
  const expenseList = useSelector((state) => state.expense.expenseList);
  const totalExpense = expenseList.reduce((acc, curr) => acc + +curr.amount, 0);

  
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  
  const handlePremiumActivation = () => {
    dispatch(themeActions.togglePremium());
    dispatch(themeActions.themeToggle()); 
  };

  

  // Function to download expenses as CSV
  const downloadCSV = () => {
    const csvData = [
      ["ID", "Amount", "Description", "Category"],
      ...expenseList.map((item) => [item.id, item.amount, item.description, item.category]),
    ];

    const csvContent = csvData
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "expenses.csv";
    link.click();
  };

  return (
    <Container fluid className={isDarkMode ? "bg-dark text-white py-4" : "bg-light text-dark py-4"} style={{ minHeight: "100vh" }}>
      <h2 className="text-center mb-4">Expense Tracker</h2>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <ExpenseForm expenseToEdit={expenseToEdit} onEditSuccess={handleEditSuccess} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <ExpenseList handleEditExpenseData={handleEditExpenseData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {totalExpense > 10000 && (
        <Row className="justify-content-center">
          <Col md="auto">
            <Button variant="warning" onClick={handlePremiumActivation} className="mb-3">
              Activate Premium
            </Button>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        <Col md="auto">
          <Button variant="success" onClick={downloadCSV}>
            Download Expenses as CSV
          </Button>
        </Col>
      </Row>
      </Container>
  );
};

export default ExpensePage;



import useExpense from "../../store/expense-context";
import { Container,Row,Col,Button, ButtonGroup ,ListGroup} from "react-bootstrap";

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
        
        <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <ListGroup>
            {expenseList.map((expense, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center mb-3">
                
                <div className="d-flex gap-3">
                  <div>${expense.amount}</div>
                  <div>{expense.description}</div>
                  <div>{expense.category}</div>
                </div>
                
                
                <ButtonGroup>
                  <Button variant="danger" onClick={() => handleDelete(expense.id)}>Delete</Button>
                  <Button variant="warning" onClick={() => handleEdit(expense)}>Edit</Button>
                </ButtonGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
    );
};

export default ExpenseList;

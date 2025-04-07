//import useExpense from "../../store/expense-context";
import { Container,Row,Col,Button, ButtonGroup ,ListGroup} from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
import axios from "axios";

const RTDB_URL = `https://expensetracker-d2edf-default-rtdb.asia-southeast1.firebasedatabase.app/userExpense`;



const ExpenseList = ({handleEditExpenseData}) => {
    


    const expenseList=useSelector((state)=>state.expense.expenseList);
    const dispatch=useDispatch();
    
 
 	
 
 	const handleDelete =async (id) => {


    try {

      await axios.delete(`${RTDB_URL}/${id}.json`)

      dispatch(expenseActions.expenseDeleteHandler(id))
    } catch (error) {
      console.log(error)
    }
 		


 	};
 
   const handleEdit = async (expense) => {
    handleEditExpenseData(expense)
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

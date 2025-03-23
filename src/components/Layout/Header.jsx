import { Link, NavLink,useNavigate, } from "react-router-dom";
import useAuth from "../../store/auth-context";
import { Container,Nav,Navbar,Button } from "react-bootstrap";
const Header=()=>{

    const navigateTo=useNavigate()
    const {isLoggedIn,handleLogOut}=useAuth()

    const logOut=()=>{
        handleLogOut();
        navigateTo('/',{replace:true});
    }



    return (
        <header >
            <Navbar bg="dark" variant="dark" expand='lg'>
                <Container className="justify-content-start">
                    <Navbar.Brand href='/'>MyWebLink</Navbar.Brand>

                        <Nav className="justify-content-center">
                            <Nav.Link as={NavLink} to='/home'>Home</Nav.Link>
                            <Nav.Link as={NavLink} to='/home'>Products</Nav.Link>
                            <Nav.Link as={NavLink} to='/home'>About Us</Nav.Link>
                        </Nav>
                        {isLoggedIn&& (<Button onClick={logOut} variant="outline-light">Logout</Button>)}
                        </Container>
                        </Navbar>        
                
                {isLoggedIn && (
                
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/user-expense'>Daily Expense</Nav.Link>
                        </Nav>
                    </Container>
                
            )}
            
        </header>
    );

}

export default Header;
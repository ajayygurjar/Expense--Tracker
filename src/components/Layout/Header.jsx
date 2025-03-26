import { Link, NavLink,useNavigate, } from "react-router-dom";
//import useAuth from "../../store/auth-context";
import { Container,Nav,Navbar,Button } from "react-bootstrap";

import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../../store/auth-reducer";

import { themeActions } from "../../store/theme-reducer";
const Header=()=>{

    const navigateTo=useNavigate()
    

    const dispatch=useDispatch();
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);


    const logOut=()=>{
        //handleLogOut();
        localStorage.removeItem('token');
        dispatch(authActions.handleLogout());

        navigateTo('/',{replace:true});
    }


    const toggleTheme = () => {
        dispatch(themeActions.themeToggle());  // Toggle dark mode
      };
    


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
            
            <div>
            <button onClick={toggleTheme}>
      Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
            </div>
            
        </header>
    );

}

export default Header;
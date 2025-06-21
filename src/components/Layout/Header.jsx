import { Link, NavLink, useNavigate } from "react-router-dom";
//import useAuth from "../../store/auth-context";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-reducer";

const Header = () => {
  const navigateTo = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logOut = () => {
    //handleLogOut();
    localStorage.removeItem("token");
    dispatch(authActions.handleLogout());

    navigateTo("/", { replace: true });
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand >
            Expense Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link as={NavLink} to="/user-expense">
                  Daily Expense
                </Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/about">
                About Us
              </Nav.Link>
            </Nav>

            {isLoggedIn && (
              <Button
                variant="outline-danger"
                className="ms-auto"
                onClick={logOut}
              >
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

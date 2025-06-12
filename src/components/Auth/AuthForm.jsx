import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import useAuth from "../../store/auth-context";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-reducer";
import { useSelector } from "react-redux";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const navigate = useNavigate(); // Navigation hook

  //const { handleLogIn } = useAuth();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)

  const dispatch=useDispatch();



  const API_KEY = "AIzaSyAWVnD8ZpwnamACMsH-P3a-kmn1_BVi8q8";
  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setIsErrorVisible(true);
    setTimeout(() => setIsErrorVisible(false), 3000);
  };

  const authFormHandler = async (event) => {
    
    event.preventDefault();
    const userAuthData = {
      email,
      password,
      returnSecureToken: true,
    };

    // Signup validation (password match)
    if (isSignUp && password !== confirmPassword) {
      showErrorMessage("Passwords don't match!");
      return;
    }

    try {
      // SignIn flow
      if (!isSignUp) {
        
        const response = await axios.post(SIGNIN_URL, userAuthData);
        
       // handleLogIn(response.data.idToken, email); 
        //setEmail(""); 
        //setPassword("");

        const token=response.data.idToken;
        const userID=response.data.localId;

        localStorage.setItem('token',token)

        dispatch(authActions.handleLogIn({token,userID}))

        navigate("/home", { replace: true }); // Navigate to home
        setEmail('')
        setPassword('')
      } else {
        // SignUp flow
        const response = await axios.post(SIGNUP_URL, userAuthData);
        console.log(response.data);
        dispatch(authActions.handleLogIn(response.data.idToken));
        setEmail(""); 
        setPassword("");
        setConfirmPassword(""); 
        navigate("/home", { replace: true }); 
      
      }
    } catch (error) {
      if (error.response && error.response.data.error.message) {
        const errorMsg = error.response.data.error.message;
        if (errorMsg === "EMAIL_NOT_FOUND") {
          showErrorMessage("Email not found");
        } else if (errorMsg === "INVALID_LOGIN_CREDENTIALS") {
          showErrorMessage("Invalid password");
        } else if (errorMsg === "EMAIL_EXISTS") {
          showErrorMessage("Email already registered");
        } else if (
          errorMsg === "WEAK_PASSWORD : Password should be at least 6 characters"
        ) {
          showErrorMessage("Password should be at least 6 characters");
        } else if (errorMsg === "INVALID_EMAIL") {
          showErrorMessage("Invalid email format");
        } else {
          showErrorMessage("An unexpected error occurred");
        }
      }
    }
  };

  const toggleSignUpLoginHandler = () => {
    setIsSignUp((prev) => !prev);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage(""); 
  };

  return (
    <main>
      <Container>
        <section>
          <h1 className="text-center text-primary">
            {isSignUp ? "Sign Up" : "Login"}
          </h1>
          <Row className="justify-content-center">
            <Col md={6} lg={4} className="border border-2 p-4 rounded">
              <Form onSubmit={authFormHandler}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus={true}
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* Confirm Password (only for signup) */}
                {isSignUp && (
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                )}

                {/* Error Message */}
                {isErrorVisible && <p style={{ color: "red" }}>{errorMessage}</p>}

                {/* Submit Button */}
                <Button variant="primary" type="submit">
                  {isSignUp ? "Sign Up" : "Login"}
                </Button>
              </Form>

              {/* Forgot Password Link */}
              {!isSignUp && (
              <div className="mt-3">
                <Button variant="link" onClick={() => navigate("/forgot-password")}>
                  Forgot Password?
                </Button>
              </div>
              )}

              
              <div className="mt-3">
                <Button variant="link" onClick={toggleSignUpLoginHandler}>
                  {isSignUp ? "Have an account? Login" : "Don't have an account? Sign Up"}
                </Button>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default AuthForm;

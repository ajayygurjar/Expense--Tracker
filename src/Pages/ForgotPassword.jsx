import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';

const API_KEY = `AIzaSyAWVnD8ZpwnamACMsH-P3a-kmn1_BVi8q8`;
const PASSWORD_RESET_LINK = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

const ForgotPassword = () => {
  const forgorUsersMail = useRef();
  const handlePasswordRest = async (event) => {
    event.preventDefault();
    //console.log(typeof forgorUsersMail.current.value);

    try {
      const response = await axios.post(PASSWORD_RESET_LINK, {
        requestType: "PASSWORD_RESET",
        email: forgorUsersMail.current.value,
      });
      console.log(response);
      forgorUsersMail.current.value = "";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
  <Container className="mt-5">
    <h1 className="text-center">Forgot Password</h1>
    <Form onSubmit={handlePasswordRest} className="mx-auto" style={{ maxWidth: '400px' }}>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          ref={forgorUsersMail}
          required
        />
      </Form.Group>


      <Button variant="primary" type="submit" block>
        Send Link
      </Button>


      <div className="mt-3 text-center">
        <Link to="/">Already a user? Login</Link>
      </div>
    </Form>
  </Container>
    );
};

export default ForgotPassword;

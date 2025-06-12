import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Home = () => {
  const API_KEY = `AIzaSyAWVnD8ZpwnamACMsH-P3a-kmn1_BVi8q8`;
  const EMAIL_VERIFICATON_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
  const token = useSelector((state) => state.auth.token);

  const verifyEmail = async () => {
    if (!token) {
      alert("You need to be logged in to verify your email.");
      return;
    }

    try {
      const response = await fetch(EMAIL_VERIFICATON_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Check your email and verify your account.");
        console.log(data);
      } else {
        let errorMessage = data?.error?.message || "Verification failed.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.message.includes("INVALID_ID_TOKEN")) {
        alert("Session expired. Please sign in again.");
      } else if (error.message.includes("USER_NOT_FOUND")) {
        alert("No user found. Please sign up or login.");
      } else {
        alert("An error occurred: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm text-center p-4">
            <Card.Body>
              <h2 className="mb-3">Welcome to Expense Tracker 🎯</h2>
              <Alert variant="info" className="mb-3">
                Your profile is incomplete.{" "}
                <Link to="/profile" className="alert-link">
                  Complete now
                </Link>
              </Alert>

              <Button variant="primary" onClick={verifyEmail}>
                Verify Email
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

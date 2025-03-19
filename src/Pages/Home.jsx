import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../store/auth-context";
//import axios from "axios";

const Home = () => {
  const API_KEY = `AIzaSyAWVnD8ZpwnamACMsH-P3a-kmn1_BVi8q8`;
  const EMAIL_VERIFICATON_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

  const { token } = useAuth();

  const verifyEmail = async () => {
    if (!token) {
      alert("You need to be logged in to verify your email");
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
      if (response.ok) {
        const data = await response.json();
        alert("check your email and verify the email");
        console.log(data);
      } else {
        const data = await response.json();
        let errorMessage = "verify fails";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.message.includes("INVALID_ID_TOKEN")) {
        alert("your session has expired. Please sign in again.");
      } else if (error.message.includes("USER_NOT_FOUND")) {
        alert("No user found.Please sign up or login.");
      } else {
        alert("An error occured: " + error.message);
      }
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Welcome to Expense Tracker!!!</h1>
      <hr />
      <span>
        Your profile is incomplete.
        <Link to={"/profile"} href="#">
          Complete now
        </Link>
        <button
          onClick={verifyEmail}
          style={{ marginLeft: "2rem" }}
          type="submit"
        >
          Verify Email
        </button>
      </span>
    </div>
  );
};

export default Home;

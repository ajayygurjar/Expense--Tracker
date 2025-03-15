import React, { useState } from "react";
import axios from "axios";
import Input from "../UI/Input";
import Home from "../../Pages/Home";


const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const API_KEY = `AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0`;
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
      email: email,
      password: password,
      returnSecureToken: true,
    };

    if (isSignUp) {
      if (password !== confirmPassword) {
        showErrorMessage(`Password don't match`);
        return;
      }
    }

    if (!isSignUp) {
      try {
        const response = await axios.post(SIGNIN_URL, userAuthData);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.data.error.message) {
          const errorMsg = error.response.data.error.message;
          if (errorMsg === "EMAIL_NOT_FOUND") {
            showErrorMessage("*Email not found");
          } else if (errorMsg === "INVALID_LOGIN_CREDENTIALS") {
            showErrorMessage("*Invalid password");
          } else {
            showErrorMessage("An unexpected error occurred");
          }
        }
      }
    } else {
      try {
        if (password === confirmPassword) {
          const response = await axios.post(SIGNUP_URL, userAuthData);

          console.log(response.data);
        } else {
          setErrorMessage("* Password doesnt Match");
          setIsErrorVisible(true);
          setTimeout(() => setIsErrorVisible(false), 3000);
        }
      } catch (error) {
        if (error.response.data.error.message === "INVALID_EMAIL") {
          setErrorMessage("* Enter a Valid Email");
        } else if (error.response.data.error.message === "EMAIL_EXISTS") {
          setErrorMessage("* Email is Already Registered");
        } else if (
          error.response.data.error.message ===
          "WEAK_PASSWORD : Password should be at least 6 characters"
        ) {
          setErrorMessage("* Password should be at least 6 characters");
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
      <section>
        <h1>{isSignUp ? `Sign Up` : `Login`}</h1>
        <form onSubmit={authFormHandler}>
          <div>
            <div>
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus={true}
              />
            </div>

            <div>
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isSignUp && (
              <div>
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          {isErrorVisible && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div>
            <button type="submit">{isSignUp ? `Sign Up` : `Login`}</button>
          </div>
        </form>
        
      </section>
      <div>
        <button type="button" onClick={toggleSignUpLoginHandler}>
          {isSignUp
            ? `Have an account  ? Login`
            : `Don't Have an account ? Sign Up`}
        </button>
      </div>
    </main>
  );
};

export default AuthForm;

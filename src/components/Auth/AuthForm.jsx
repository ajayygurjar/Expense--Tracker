import React, { useState } from "react";
import axios from "axios";
import Input from "../UI/Input";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const API_KEY = `AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0`;
  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setIsErrorVisible(true);
    setTimeout(() => setIsErrorVisible(false), 3000);
  };

  const authFormHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showErrorMessage("Passwords don't match");
      return;
    }

    const userAuthData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    console.log(userAuthData);

    try {
      if (password === confirmPassword) {
        const response = await axios.post(SIGNUP_URL, userAuthData);
        console.log(response.data);
      } else {
        setErrorMessage("Password doesnt Match");
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 3000);
      }
    } catch (error) {
      if (error.response.data.error.message === "EMAIL_EXISTS") {
        setErrorMessage("*Email is Already Registered");
        setIsErrorVisible(true);
      } else if (
        error.response.data.error.message ===
        "WEAK_PASSWORD : Password should be at least 6 characters"
      ) {
        setErrorMessage(
          "*Weak Password, Password should be at least 6 characters"
        );
        setIsErrorVisible(true);
      }
      setTimeout(() => setIsErrorVisible(false), 3000);
    }
  };

  return (
    <main>
      <section>
        <h1>SignUp</h1>
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
          </div>
          {isErrorVisible && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </section>
      <div>
        <button type="button">Have an account? Login</button>
      </div>
    </main>
  );
};

export default AuthForm;

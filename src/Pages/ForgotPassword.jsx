import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const API_KEY = "AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0";
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
    <div>
      <h1>Forgot Password</h1>

      <form onSubmit={handlePasswordRest}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          ref={forgorUsersMail}
          required
        ></input>

        <button type="submit">Send Link</button>
        <Link to={"/"}>Already a user?Login</Link>
      </form>
      <div></div>
    </div>
  );
};

export default ForgotPassword;

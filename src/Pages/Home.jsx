import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Expense Tracker!!!</h1>
      <hr />
      <span>
        Your profile is incomplete.
        <Link to={"/profile"}  href="#">
          Complete now
        </Link>
      </span>
    </div>
  );
};

export default Home;

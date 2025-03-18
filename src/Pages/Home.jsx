import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../store/auth-context";
//import axios from "axios";

const Home = () => {
  const API_KEY=`AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0`
  const EMAIL_VERIFICATON_URL=`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`

  const {token}=useAuth();

  const verifyEmail=async ()=>{
    try{
      const response=await fetch(EMAIL_VERIFICATON_URL,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          requestType:'VERIFY_EMAIL',
          idToken:token,
        })

      })
      if(response.ok){
        const data=await response.json();
        alert('check your email and verify the email')
        console.log(data)
      }
      else{
        const data=await response.json();
        let errorMessage='verify fails';
        if(data&& data.error && data.error.message){
          errorMessage=data.error.message;
        }
        throw new Error(errorMessage)
      }
    }catch(error){
      console.log(error)
    }


  }





  return (
    <div>
      <h1>Welcome to Expense Tracker!!!</h1>
      <hr />
      <span>
        Your profile is incomplete.
        <Link to={"/profile"}  href="#">
          Complete now
        </Link>
        <button onClick={verifyEmail} style={{marginLeft:'2rem'}} type="submit">Verify Email</button>
      </span>
    </div>
  );
};

export default Home;

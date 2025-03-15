import React,{useState} from 'react';
import axios from 'axios';


 
 const AuthForm = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');


    const API_KEY=`AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0`;
    const SIGNUP_URL=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;




    const authFormHandler=async(event)=>{

        event.preventDefault()


        const userAuthData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };


        console.log(userAuthData);
 		console.log(confirmPassword === password);


        try{

            if(password===confirmPassword){
                const response=axios.post(SIGNUP_URL,userAuthData)
                console.log(response.data)
            }
        }
        catch(error){
            console.log(error)
        }


    }


 	return (
 		<main>
 			<section>
 				<h1>SignUp</h1>
 				<form onSubmit={authFormHandler}>
 					<div>
 						<div>
 							<label htmlFor="email" >
 								Email Address
 							</label>
 							<input
 								id="email"
 								name="email"
 								type="email"
 								required
 								autoFocus
                                 value={email}
 								onChange={(e) => setEmail(e.target.value)}
 								
 								placeholder="Email"
 							/>
 						</div>
 

 						<div>
 							<label htmlFor="password" >
 								Password
 							</label>
 							<input
 								id="password"
 								name="password"
 								type="password"
 								required

 								autoComplete=""
                                 value={password}
 								onChange={(e) => setPassword(e.target.value)}
 								
 								placeholder="Password"
 							/>
 						</div>
 						<div>
 							<label htmlFor="confirmPassword" >
 							   Confim Password
 							</label>
 							<input
 								id="confirmPassword"
 								name="confirmPassword"
 								type="password"
 								required
 								autoComplete=""
 								
 								placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
 							/>
 						</div>
 					</div>
 					<div>
 						<button type="submit" >
 							Sign Up
 						</button>
 					</div>
 				</form>
 			</section>
 			<div>
 				<button type="button"  >
 					Have an account? Login
 				</button>
 			</div>
 		</main>
 	);
 };
 
 export default AuthForm;
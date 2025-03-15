import React from 'react';
 
 const AuthForm = () => {
 	return (
 		<main>
 			<section>
 				<h1>SignUp</h1>
 				<form>
 					<div>
 						<div>
 							<label htmlFor="email" className="">
 								Email Address
 							</label>
 							<input
 								id="email"
 								name="email"
 								type="email"
 								required
 								autoFocus
 								className=""
 								placeholder="Email"
 							/>
 						</div>
 

 						<div>
 							<label htmlFor="password" className="">
 								Password
 							</label>
 							<input
 								id="password"
 								name="password"
 								type="password"
 								required
 								autoComplete=""
 								className=""
 								placeholder="Password"
 							/>
 						</div>
 						<div>
 							<label htmlFor="password" className="">
 								Password
 							</label>
 							<input
 								id="password"
 								name="password"
 								type="password"
 								required
 								autoComplete=""
 								className=""
 								placeholder="Confirm Password"
 							/>
 						</div>
 					</div>
 					<div>
 						<button type="submit" className="">
 							Sign Up
 						</button>
 					</div>
 				</form>
 			</section>
 			<div>
 				<button type="button" className="">
 					Have an ccount? Login
 				</button>
 			</div>
 		</main>
 	);
 };
 
 export default AuthForm;
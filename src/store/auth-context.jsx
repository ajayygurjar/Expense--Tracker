import React,{useContext, useState} from 'react';

 
 const AuthContext = React.createContext();
 
 export const AuthProvider = ({ children }) => {
    const [email,setEmail]=useState('')

    const [token,setToken]=useState(localStorage.getItem('token')||null);
    const isLoggedIn=!!token;

    const handleLogIn=(token,email)=>{
        setToken(token);
        localStorage.setItem('token',token)
        setEmail(email)
        localStorage.setItem('email',email)
        //console.log(token)
    }




 	const context = {
        token,isLoggedIn,handleLogIn,email
    };

    
 	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
 };

 const useAuth = () => useContext(AuthContext);
 
 export default useAuth;
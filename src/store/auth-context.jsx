import React,{useContext, useState} from 'react';

 
 const AuthContext = React.createContext();
 
 export const AuthProvider = ({ children }) => {

    const [token,setToken]=useState(localStorage.getItem('token')||null);
    const isLoggedIn=!!token;

    const handleLogIn=(token)=>{
        setToken(token);
    }




 	const context = {
        token,isLoggedIn,handleLogIn
    };

    
 	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
 };

 const useAuth = () => useContext(AuthContext);
 
 export default useAuth;
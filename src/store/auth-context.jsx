import React,{useContext} from 'react';

 
 const AuthContext = React.createContext();
 
 export const AuthProvider = ({ children }) => {
 	const context = {};
 	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
 };

 const useAuth = () => useContext(AuthContext);
 
 export default useAuth;
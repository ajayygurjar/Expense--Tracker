import React from 'react';
 
 const AuthContext = React.createContext();
 
 export const AuthProvider = ({ children }) => {
 	const context = {};
 	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
 };
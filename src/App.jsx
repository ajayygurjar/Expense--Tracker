import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
//import useAuth from "./store/auth-context";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./Pages/Home";
import SignInPage from "./Pages/SignInPage";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import ExpensePage from "./components/ExpenseTrack/ExpensePage";

import { useSelector } from "react-redux";
import './App.css';
import AboutPage from "./Pages/AboutPage";



function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn || state.auth.token);
const isDarkMode = useSelector((state) => state.theme.isDarkMode);



if (isDarkMode) {
  document.body.classList.add('dark-mode');  
} else {
  document.body.classList.remove('dark-mode');  
}


  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: isLoggedIn ? <Navigate to="/home" /> : <SignInPage /> },
        { path: "/home", element: isLoggedIn ? <Home /> : <Navigate to="/" /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/profile", element: isLoggedIn ? <Profile /> : <Navigate to="/" /> },
        { path: "/forgot-password", element: !isLoggedIn ? <ForgotPassword /> : <Navigate to="/home" /> },
        { path: "/user-expense", element: isLoggedIn ? <ExpensePage /> : <Navigate to="/" /> },
      ],
    },
  ]);

  return (
    <div>
    
      <RouterProvider router={router} />
    
    </div>
  );
}

export default App;

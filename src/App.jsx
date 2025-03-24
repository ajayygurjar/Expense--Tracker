import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
//import useAuth from "./store/auth-context";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./Pages/Home";
import SignInPage from "./Pages/SignInPage";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import ExpensePage from "./Pages/ExpensePage";
import { ExpenseContextProvider } from "./store/expense-context";
import { useSelector } from "react-redux";


function App() {
const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)

  //const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: isLoggedIn ? <Navigate to="/home" /> : <SignInPage /> },
        { path: "/home", element: isLoggedIn ? <Home /> : <Navigate to="/" /> },
        { path: "/profile", element: isLoggedIn ? <Profile /> : <Navigate to="/" /> },
        { path: "/forgot-password", element: !isLoggedIn ? <ForgotPassword /> : <Navigate to="/home" /> },
        { path: "/user-expense", element: isLoggedIn ? <ExpensePage /> : <Navigate to="/" /> },
      ],
    },
  ]);

  return (
    <ExpenseContextProvider>
      <RouterProvider router={router} />
    </ExpenseContextProvider>
  );
}

export default App;

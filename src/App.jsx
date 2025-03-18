import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./Pages/Home";
import SignInPage from "./Pages/SignInPage";
import Profile from "./Pages/Profile";
//import AuthForm from "./components/Auth/AuthForm"
//import Header from "./components/Layout/Header"
import RootLayout from "./components/Layout/RootLayout";
import ForgotPassword from "./Pages/ForgotPassword";
import useAuth from "./store/auth-context";
import ExpensePage from "./Pages/ExpensePage";
import { ExpenseContextProvider } from "./store/expense-context";

function App() {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      children: [
        { path: "/", element: <SignInPage /> },
        { path: "/home", element: isLoggedIn ? <Home /> : <Navigate to="/" /> },
        {
          path: "/profile",
          element: isLoggedIn ? <Profile /> : <Navigate to="/" />,
        },
        {
          path: "/forgot-password",
          element: !isLoggedIn ? <ForgotPassword /> : <Home />,
        },
        {
          path: "/user-expense",
          element: isLoggedIn ? <ExpensePage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <>
    <ExpenseContextProvider>
      <RouterProvider router={router} />
      </ExpenseContextProvider>
    </>
  );
}

export default App;

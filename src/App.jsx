import { createBrowserRouter,RouterProvider } from "react-router-dom"

import Home from "./Pages/Home"
import SignInPage from "./Pages/SignInPage"

//import AuthForm from "./components/Auth/AuthForm"
import Header from "./components/Layout/Header"
import RootLayout from "./components/Layout/RootLayout"


const router=createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    id:'root',
    children:[
      {path:'/home',element:<Home/>},
      {path:'/',element:<SignInPage/>}
    ]
  }
])

function App() {



 return (
  <>
  <RouterProvider router={router}/>
  </>
 )
}

export default App

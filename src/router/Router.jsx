
import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home/Home";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        }, 
        {
            path:'/login',
            element: <Login></Login>
        },
        {
            path:'/register',
            element: <Register></Register>
        },
      ]
    },
  ]);
  export default router;
import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Allusers from "../Pages/Dashboard/Allusers.jsx/Allusers";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
         {
            path: '/',
            element: <Home></Home>
         },
         {
            path:'/Register',
            element: <Register></Register>
         },
         {
          path: '/Login',
          element: <Login></Login>
         }
      ]
    },
    {
      path: 'Dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'Dashboard/Alluser',
          element: <Allusers></Allusers>
        }
      ]
    }
  ]);
import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Home/Authentication/Register/Register";


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
         }
      ]
    },
  ]);
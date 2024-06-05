import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Allusers from "../Pages/Dashboard/Allusers.jsx/Allusers";
import AddTask from "../Pages/Dashboard/addTask/AddTask";
import MyTasks from "../Pages/Dashboard/MyTask/MyTasks";
import TaskList from "../Pages/Dashboard/TaskList/TaskList";


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
          path: '/Dashboard/alluser',
          element: <Allusers></Allusers>
        },
        {
          path: '/Dashboard/addTasks',
          element: <AddTask></AddTask>
        },
        {
          path: '/Dashboard/manageTasks',
          element: <MyTasks></MyTasks>
        },
        {
          path: '/Dashboard/taskList',
          element: <TaskList></TaskList>
        }
      ]
    }
  ]);
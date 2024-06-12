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
import TaskDetails from "../Pages/Dashboard/TaskDetails/TaskDetails";
import MySubmission from "../Pages/Dashboard/MySubmission/MySubmission";
import WorkerHome from "../Pages/Dashboard/WorkerHome/WorkerHome";
import TaskCreatorHome from "../Pages/Dashboard/TaskCreatorHome/TaskCreatorHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import PurchaseCoins from "../Pages/Dashboard/PurchaseCoin/PurchaseCoins";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Withdrawls from "../Pages/Dashboard/Withdraw/Withdrawls";
import ManageTasks from "../Pages/Dashboard/ManageTasks/ManageTasks";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
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
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        // worker
        {
          path: '/Dashboard/WorkerHome',
          element: <WorkerHome></WorkerHome>
        },
        {
          path: '/Dashboard/taskList',
          element: <TaskList></TaskList>
        },
        {
          path: '/Dashboard/taskDetails/:id',
          element: <TaskDetails></TaskDetails>,
          loader: () => fetch('http://localhost:5000/availableTasks')
        },
        {
          path: '/Dashboard/mySubmissions',
          element: <MySubmission></MySubmission>
        },
        {
          path: '/Dashboard/withdrawls',
          element: <Withdrawls></Withdrawls>
        },
        // task-creator
        {
          path: '/Dashboard/addTasks',
          element: <AddTask></AddTask>
        },
        {
          path: '/Dashboard/TaskCreatorHome',
          element: <TaskCreatorHome></TaskCreatorHome>
        },
        {
          path: '/Dashboard/myTasks',
          element: <MyTasks></MyTasks>
        },
        {
          path: '/Dashboard/paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path: '/Dashboard/PurchaseCoin',
          element: <PurchaseCoins></PurchaseCoins>
        },
        // admin
        {
          path: '/Dashboard/alluser',
          element: <Allusers></Allusers>
        },
        {
          path: '/Dashboard/adminHome',
          element: <AdminHome></AdminHome>
        },
        {
          path: '/Dashboard/manageTasks',
          element: <ManageTasks></ManageTasks>
        }
      ]
    }
  ]);
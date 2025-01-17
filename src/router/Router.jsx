import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home/Home";
import DashboardLayout from "../Dashboard/DashboardLayout ";




// worker
import DashboardHome from "../Dashboard/worker/DashboardHome";
import TaskList from "../Dashboard/worker/TaskList";
import Submissions from "../Dashboard/worker/Submissions";
import Withdrawals from "../Dashboard/worker/Withdrawals";

// Buyer page 
import BuyerDashboardHome from "../Dashboard/Buyer/BuyerDashboardHome";
import AddTasks from "../Dashboard/Buyer/AddTasks";
import MyTasks from "../Dashboard/Buyer/MyTasks";
import PurchaseCoins from "../Dashboard/Buyer/PurchaseCoins";

// Admin page
import AdminDashboardHome from "../Dashboard/Admin/AdminDashboardHome";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageTasks from "../Dashboard/Admin/ManageTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>, // Shared Dashboard Layout
    children: [
      // Worker Routes
      {
        path: "/dashboard/worker-home",
        element: <DashboardHome></DashboardHome>, // Worker Dashboard Home
      },
      {
        path: "/dashboard/tasks",
        element: <TaskList></TaskList>, // Task List for Worker
      },
      {
        path: "/dashboard/submissions",
        element: <Submissions></Submissions>, // Submissions Page for Worker
      },
      {
        path: "/dashboard/withdrawals",
        element: <Withdrawals></Withdrawals>, // Withdrawals Page for Worker
      },

      // Buyer Routes

      {
        path: "/dashboard/buyer-home",
        element: <BuyerDashboardHome></BuyerDashboardHome>, // Buyer Dashboard Home
      },
      {
        path: "/dashboard/add-tasks",
        element: <AddTasks></AddTasks>, // Add Tasks Page for Buyer
      },
      {
        path: "/dashboard/my-tasks",
        element: <MyTasks></MyTasks>, // My Tasks Page for Buyer
      },
      {
        path: "/dashboard/purchase-coins",
        element: <PurchaseCoins></PurchaseCoins>, // Purchase Coins Page for Buyer
      },

      // Admin Routes

      {
        path: "/dashboard/admin-home",
        element: <AdminDashboardHome></AdminDashboardHome>, // Admin Dashboard Home
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>, // Manage Users Page for Admin
      },
      {
        path: "/dashboard/manage-tasks",
        element: <ManageTasks></ManageTasks>, // Manage Tasks Page for Admin
      },
    ],
  },
]);

export default router;

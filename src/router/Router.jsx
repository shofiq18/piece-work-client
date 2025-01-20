import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home/Home";
import DashboardLayout from "../Dashboard/DashboardLayout ";




// worker
import WorkerHome from "../Dashboard/Worker/WorkerHome";
import TaskList from "../Dashboard/worker/TaskList";
import Submissions from "../Dashboard/worker/Submissions";
import Withdrawals from "../Dashboard/worker/Withdrawals";

// Buyer page 
import BuyerDashboardHome from "../Dashboard/Buyer/BuyerDashboardHome";
import AddTasks from "../Dashboard/Buyer/AddTask";
import MyTasks from "../Dashboard/Buyer/MyTasks";
import PurchaseCoins from "../Dashboard/Buyer/PurchaseCoins";
import CheckoutPage from "../Dashboard/Buyer/CheckoutPage";
import CheckoutForm from "../Dashboard/Buyer/CheckoutForm";



// Admin page
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageTasks from "../Dashboard/Admin/ManageTasks";
import PaymentHistory from "../Dashboard/Buyer/PaymentHistory";
import TaskDetails from "../Dashboard/Worker/TaskDetails";
import AdminHome from "../Dashboard/Admin/AdminHome";
import MyProfile from "../page/UserProfile";
import UserProfile from "../page/UserProfile";

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
      {
        path: "/user-profile",
        element: <UserProfile></UserProfile>,
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
        element: <WorkerHome></WorkerHome>, // Worker Dashboard Home
      },
      {
        path: "/dashboard/tasks",
        element: <TaskList></TaskList>, // Task List for Worker
      },
      {
        path: "/dashboard/tasks/:taskId",
        element: <TaskDetails></TaskDetails>, // Task List for Worker
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
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>, // Purchase Coins Page for Buyer
      },
      {
        path: "/dashboard/checkout",
        element: <CheckoutPage></CheckoutPage>, 
      },
      {
        path: "/dashboard/buy-coin",
        element: <CheckoutForm></CheckoutForm>, 
      },

      // Admin Routes

      {
        path: "/dashboard/admin-home",
        element: <AdminHome></AdminHome>, // Admin Dashboard Home
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

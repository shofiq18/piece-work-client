import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home/Home";
import DashboardLayout from "../Dashboard/DashboardLayout ";
import UserProfile from "../page/UserProfile";





// worker
import WorkerHome from "../Dashboard/Worker/WorkerHome";
import TaskDetails from "../Dashboard/Worker/TaskDetails";
import Withdrawals from "../Dashboard/Worker/Withdrawals";
import Submissions from "../Dashboard/Worker/Submissions";
import TaskList from "../Dashboard/Worker/TaskList";






// Buyer page 
import BuyerDashboardHome from "../Dashboard/Buyer/BuyerDashboardHome";
import AddTasks from "../Dashboard/Buyer/AddTask";
import MyTasks from "../Dashboard/Buyer/MyTasks";
import PurchaseCoins from "../Dashboard/Buyer/PurchaseCoins";
import CheckoutPage from "../Dashboard/Buyer/CheckoutPage";
import CheckoutForm from "../Dashboard/Buyer/CheckoutForm";
import PaymentHistory from "../Dashboard/Buyer/PaymentHistory";




// Admin page
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageTasks from "../Dashboard/Admin/ManageTasks";
import AdminHome from "../Dashboard/Admin/AdminHome";
import About from "../page/About";
import Contact from "../page/Contact";

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
      {
        path: "/about", 
        element: <About></About>  
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      }, 
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>, 
    children: [

      // Worker Routes
      {
        path: "/dashboard/worker-home",
        element: <WorkerHome></WorkerHome>, 
      },
      {
        path: "/dashboard/tasks",
        element: <TaskList></TaskList>, 
      },
      {
        path: "/dashboard/tasks/:taskId",
        element: <TaskDetails></TaskDetails>, 
      },
      {
        path: "/dashboard/submissions",
        element: <Submissions></Submissions>, 
      },
      {
        path: "/dashboard/withdrawals",
        element: <Withdrawals></Withdrawals>, 
      },

      // Buyer Routes

      {
        path: "/dashboard/buyer-home",
        element: <BuyerDashboardHome></BuyerDashboardHome>, 
      },
      {
        path: "/dashboard/add-tasks",
        element: <AddTasks></AddTasks>, 
      },
      {
        path: "/dashboard/my-tasks",
        element: <MyTasks></MyTasks>, 
      },
      {
        path: "/dashboard/purchase-coins",
        element: <PurchaseCoins></PurchaseCoins>, 
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>, 
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
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>, 
      },
      {
        path: "/dashboard/manage-tasks",
        element: <ManageTasks></ManageTasks>, 
      },
    ],
  },
]);

export default router;

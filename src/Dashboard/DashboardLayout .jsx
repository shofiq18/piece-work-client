import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  const sidebarLinks = {
    Worker: [
      { name: "Home", path: "/dashboard/worker-home" },
      { name: "Task List", path: "/dashboard/tasks" },
      { name: "My Submissions", path: "/dashboard/submissions" },
      { name: "Withdrawals", path: "/dashboard/withdrawals" },
    ],
    Buyer: [
      { name: "Home", path: "/dashboard/buyer-home" },
      { name: "Add Tasks", path: "/dashboard/add-tasks" },
      { name: "My Tasks", path: "/dashboard/my-tasks" },
      { name: "Purchase Coins", path: "/dashboard/purchase-coins" },
      { name: "Payment History", path: "/dashboard/payment-history" },
    ],
    Admin: [
      { name: "Home", path: "/dashboard/admin-home" },
      { name: "Manage Users", path: "/dashboard/manage-users" },
      { name: "Manage Tasks", path: "/dashboard/manage-tasks" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white shadow-md px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl text-green-400 font-bold">Piece Work</h1>
        </Link>
        <div className="flex items-center space-x-6">
          {user.role !== "Admin" && <span className="font-semibold">Coins: {user.coins}</span>}
          <span className="font-semibold"> {user.role}</span>
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </header>

      <div className="flex flex-grow">
        <aside className="bg-gray-800 text-white w-64 p-4 space-y-4">
          <ul className="space-y-2">
            {sidebarLinks[user.role]?.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      <footer className="bg-gray-800 text-white text-center py-3">
        <p>© 2025 FoodBridge | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;

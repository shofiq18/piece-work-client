
import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white shadow-md px-4 py-3 flex items-center justify-between">
  <div className="flex items-center space-x-4">
    {/* Hamburger Icon */}
    <button
      className="lg:hidden p-2 rounded hover:bg-blue-600"
      onClick={toggleSidebar}
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    {/* Logo */}
    <Link to="/" className="text-2xl font-bold text-green-400">
      Piece Work
    </Link>
  </div>

  {/* User Info */}
  <div className="flex items-center space-x-4">
    {/* Hide coins on mobile devices */}
    {user.role !== "Admin" && (
      <span className="font-semibold hidden lg:block">Coins: {user.coins}</span>
    )}
    <span className="font-semibold">{user.role}</span>
    <img
      src={user.photo}
      alt={user.name}
      className="w-10 h-10 rounded-full border-2 border-white"
    />
  </div>
</header>


      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white w-64 lg:static fixed inset-y-0 left-0 z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <ul className="space-y-2">
              {sidebarLinks[user.role]?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="block px-4 py-2 rounded hover:bg-gray-700"
                    onClick={() => setIsSidebarOpen(false)} 
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-grow p-6 bg-gray-100 transition-all duration-300 ${
            isSidebarOpen ? "opacity-50 pointer-events-none lg:opacity-100" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-3">
        <p>© 2025 Piece Work | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;

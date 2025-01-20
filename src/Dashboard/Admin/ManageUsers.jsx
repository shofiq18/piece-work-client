import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle user removal
  const handleRemoveUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/users/${id}`);
        Swal.fire("Deleted!", "The user has been removed.", "success");
        refetch(); // Refresh the data
      }
    });
  };

  // Handle role change with coin adjustment
  const handleRoleChange = async (id, newRole) => {
    let newCoins;
    if (newRole === "Buyer") newCoins = 50; // Default coins for Buyer
    if (newRole === "Worker") newCoins = 10; // Default coins for Worker

    try {
      const payload = { role: newRole, ...(newCoins !== undefined && { coins: newCoins }) };

      await axiosSecure.patch(`/users/${id}`, payload); // Send updated role and coins
      Swal.fire("Success!", "User role and coins have been updated.", "success");
      refetch(); // Refresh the data
    } catch (error) {
      Swal.fire("Error!", "Failed to update the user role.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users ({users.length})</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Photo</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Coins</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">
                  <img src={user.photo} alt="User" className="w-10 h-10 rounded-full" />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">{user.coins}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleRemoveUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

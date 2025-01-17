import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  // Mock authentication - Replace this with your actual auth logic
  const userRole = localStorage.getItem("role"); // e.g., "Worker", "Buyer", "Admin"

  // Check if the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    // Redirect unauthorized users to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

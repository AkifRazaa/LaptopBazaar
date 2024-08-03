import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ expectedRole }) => {
  const userRole = localStorage.getItem("role");

  // Check if the user's role matches any of the expected roles
  const isAuthorized = Array.isArray(expectedRole)
    ? expectedRole.includes(userRole)
    : userRole === expectedRole;

  if (isAuthorized) {
    return <Outlet />;
  } else {
    // Redirect to a different route if the user's role doesn't match
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  
  // If no user is found (not logged in), redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected route children
  return children;
};

export default ProtectedRoute;

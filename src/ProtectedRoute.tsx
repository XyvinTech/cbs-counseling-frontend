import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return allowedRoles.includes(userType || "") ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;

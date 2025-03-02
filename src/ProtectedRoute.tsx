import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = localStorage.getItem("423455ehgwhh");
  const userType = localStorage.getItem("hgyywgywgdydwgy");
  if (!token || !userType) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return allowedRoles.includes(userType) ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default ProtectedRoute;

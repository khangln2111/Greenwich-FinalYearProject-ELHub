import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../../zustand/stores/appStore";

// options: roles are array of roles that are allowed to access the route
interface ProtectedRouteProps {
  requiredRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute = ({ requiredRoles, redirectPath = "/login" }: ProtectedRouteProps) => {
  const user = useAppStore((s) => s.currentUser);

  // If not logged in, redirect to login page
  if (!user) return <Navigate to={redirectPath} replace />;

  // If there are requiredRoles, check role
  if (requiredRoles && !requiredRoles.some((r) => user.roles.includes(r))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If pass all checks, render Outlet (child routes)
  return <Outlet />;
};

export default ProtectedRoute;

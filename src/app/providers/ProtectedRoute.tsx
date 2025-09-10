import { Navigate, useLocation } from "react-router-dom";
import CenterLoader from "../../components/CenterLoader/CenterLoader";
import { useGetCurrentUser } from "../../features/auth/identity.hooks";
import { useAuthStore } from "../../zustand/stores/authStore";

interface ProtectedRouteProps {
  requiredRoles?: string[];
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute = ({
  requiredRoles,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const accessToken = useAuthStore((s) => s.accessToken);

  const { data: user, isFetching } = useGetCurrentUser();

  if (isFetching) return <CenterLoader height={500} />;

  if (!accessToken || !user) {
    // Pass state current location
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname + location.search }} />
    );
  }

  if (requiredRoles && !requiredRoles.some((r) => user.roles.includes(r))) {
    return (
      <Navigate to="/unauthorized" replace state={{ from: location.pathname + location.search }} />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

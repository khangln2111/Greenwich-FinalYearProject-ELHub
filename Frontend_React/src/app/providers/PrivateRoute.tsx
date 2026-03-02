import { Navigate, Outlet, useLocation } from "react-router";
import CenterLoader from "../../components/CenterLoader/CenterLoader";
import { useGetCurrentUser } from "../../features/auth/identity.hooks";
import { useAuthStore } from "../../zustand/stores/authStore";

interface PrivateRouteProps {
  requiredRoles?: string[];
  redirectPath?: string;
  isLayoutRoute?: boolean;
  children?: React.ReactNode;
}

const PrivateRoute = ({
  requiredRoles,
  redirectPath = "/login",
  children,
  isLayoutRoute = false,
}: PrivateRouteProps) => {
  const location = useLocation();
  const accessToken = useAuthStore((s) => s.accessToken);
  const { data: user, isFetching } = useGetCurrentUser();

  if (isFetching) return <CenterLoader height={500} />;

  if (!accessToken || !user) {
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname + location.search }} />
    );
  }

  if (
    requiredRoles &&
    requiredRoles.length > 0 &&
    !requiredRoles.some((r) => user.roles.includes(r))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return isLayoutRoute ? <Outlet /> : <>{children}</>;
};

export default PrivateRoute;

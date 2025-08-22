import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEnsureAuthLoaded } from "../app/hooks";
import { ROUTES } from "../utils/constants";

export default function ProtectedRoute({ children, roles }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, initialized } = useEnsureAuthLoaded();

  useEffect(() => {
    if (initialized && !user) {
      navigate(ROUTES.LOGIN, { state: { from: location }, replace: true });
    } else if (initialized && user) {
      // Handle role-based redirection
      if (roles && !roles.includes(user.role)) {
        if (user.role === "admin") {
          navigate(ROUTES.ADMIN_DASH, { replace: true });
        } else if (user.role === "owner") {
          navigate(ROUTES.OWNER_DASH, { replace: true });
        } else {
          navigate(ROUTES.STORES, { replace: true });
        }
      }
    }
  }, [user, initialized, roles, navigate, location]);

  if (!initialized) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

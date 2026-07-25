import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppState } from "../state/AppState";

export function ProtectedRoute() {
  const { auth } = useAppState();
  const location = useLocation();

  if (!auth) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return <Outlet />;
}

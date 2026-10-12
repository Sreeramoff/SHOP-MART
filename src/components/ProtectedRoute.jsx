import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {

  const { token } = useAuth();

  const location = useLocation();


  // User is NOT logged in
  if (!token) {

    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location.pathname + location.search
        }}
      />
    );

  }


  // User is logged in
  return <Outlet />;
}
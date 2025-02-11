import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode; // Componente a renderizar si está autenticado
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const userRoles = useSelector(
    (state: RootState) => state.auth.user
  );

  if (!isAuthenticated ) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(userRoles.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

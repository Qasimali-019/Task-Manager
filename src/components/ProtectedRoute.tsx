
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AuthState } from "../types/task";

type ProtectedRouteProps = {
    children: React.ReactNode;
    requiredRole?: "user" | "admin";
};

function ProtectedRoute({
    children,
    requiredRole
}: ProtectedRouteProps) {

    const { user, isLoggedIn } = useSelector(
        (state: { auth: AuthState }) => state.auth
    );

    if (!isLoggedIn || !user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/tasks" replace />;
    }

    return children;
}

export default ProtectedRoute;


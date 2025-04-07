import { Navigate } from "react-router-dom";
import { useApp } from "../hooks/appContext.jsx"; // Import the context hook

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useApp();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
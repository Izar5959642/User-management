import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import UserList from "../components/usersList";

const SafeRouter = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("token");
    return token ? <>{children}</> : <Navigate to="/login" replace />
};

const router = createBrowserRouter([
    {
        path: "/",
        element: < Navigate to='/login' />,
    },

    {
        path: "/login",
        element: <LoginForm />,
    },

    {
        path: "/users",
        element: (
            <SafeRouter>
                <UserList />
            </SafeRouter>
        )
    },

    // {
    //     path: "/*",
    //     element: < Navigate to='/login' />,
    // },
])

export default router;
import Login from "../pages/Login";

export const protectedRoutes = [
];
export const publicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
];
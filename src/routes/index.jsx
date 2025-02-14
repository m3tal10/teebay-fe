import Login from "../pages/Login";
import SignUp from "../pages/Signup";

export const protectedRoutes = [];
export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

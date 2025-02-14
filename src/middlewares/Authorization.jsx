import { Navigate, Outlet, useLocation } from "react-router-dom";

const Authorization = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect to login if no user is logged in
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default Authorization;

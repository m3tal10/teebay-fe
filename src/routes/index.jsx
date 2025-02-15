import CreateProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Login from "../pages/Login";
import MyProducts from "../pages/MyProducts";
import SignUp from "../pages/Signup";

export const protectedRoutes = [
  {
    path: "/my-products",
    element: <MyProducts />,
  },
  {
    path: "/add-products",
    element: <CreateProduct />,
  },
  {
    path: "/edit/:productId",
    element: <EditProduct />,
  },
];
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

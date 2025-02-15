import CreateProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Login from "../pages/Login";
import MyProducts from "../pages/MyProducts";
import ProductDetails from "../pages/ProductDetails";
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
  {
    path: "/product/:productId",
    element: <ProductDetails />,
  },
];

export const dashBoardRoutes = [
  {
    path: "bought",
    element: <Login />,
  },
  {
    path: "sold",
    element: <Login />,
  },
  {
    path: "borrowed",
    element: <Login />,
  },
  {
    path: "lent",
    element: <Login />,
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

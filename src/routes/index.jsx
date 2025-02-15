import CreateProduct from "../pages/AddProduct";
import BorrowedProducts from "../pages/BorrowedProducts";
import BoughtProducts from "../pages/BoughtProducts";
import EditProduct from "../pages/EditProduct";
import LentProducts from "../pages/LentProducts";
import Login from "../pages/Login";
import MyProducts from "../pages/MyProducts";
import ProductDetails from "../pages/ProductDetails";
import SignUp from "../pages/Signup";
import SoldProducts from "../pages/SoldProducts";

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
    element: <BoughtProducts />,
  },
  {
    path: "sold",
    element: <SoldProducts />,
  },
  {
    path: "borrowed",
    element: <BorrowedProducts />,
  },
  {
    path: "lent",
    element: <LentProducts />,
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

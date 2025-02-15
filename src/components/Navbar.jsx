import { NavLink, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";
import Button from "./Button";
import { toast } from "react-toastify";
import { useApolloClient } from "@apollo/client";

function Navbar() {
  const navigate = useNavigate();
  const client = useApolloClient();
  const handleLogOut = async () => {
    try {
      // Clear auth token from localStorage
      localStorage.removeItem("token");
      // Clear Apollo cache completely
      await client.clearStore();
      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <nav>
      <div className="nav-links">
        <NavLink
          to="/dashboard/bought"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          All Products
        </NavLink>
        <NavLink
          to="/my-products"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          My Products
        </NavLink>
      </div>
      <Button text="Logout" onClick={handleLogOut} type="danger" />
    </nav>
  );
}

export default Navbar;

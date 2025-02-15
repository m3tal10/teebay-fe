import { NavLink, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";
import Button from "./Button";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully.");
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

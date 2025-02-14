import { NavLink } from "react-router-dom";
import "../styles/components/Navbar.css";
import Button from "./Button";

function Navbar() {
  return (
    <nav>
      <div className="nav-links">
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
      <Button
        text="Logout"
        onClick={() => console.log("Logout clicked")}
        type="danger"
      />
    </nav>
  );
}

export default Navbar;

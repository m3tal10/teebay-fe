import { NavLink } from "react-router-dom";
import "../styles/components/DashboardNav.css";

function DashBoardNav() {
  return (
    <nav>
      <div className="nav-links-dashboard">
        <NavLink
          to="bought"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Bought
        </NavLink>
        <NavLink
          to="sold"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Sold
        </NavLink>
        <NavLink
          to="borrowed"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Borrowed
        </NavLink>
        <NavLink
          to="lent"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Lent
        </NavLink>
      </div>
    </nav>
  );
}

export default DashBoardNav;

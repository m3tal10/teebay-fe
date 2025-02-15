import { Outlet } from "react-router-dom";
import DashBoardNav from "../components/DashboardNav";
function DashboardLayout() {
  return (
    <>
      <DashBoardNav />
      <Outlet />
    </>
  );
}

export default DashboardLayout;

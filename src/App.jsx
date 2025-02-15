import { Route, Routes } from "react-router-dom";
import { dashBoardRoutes, protectedRoutes, publicRoutes } from "./routes";
import Authorization from "./middlewares/Authorization";
import Layout from "./ui/Layout";
import Home from "./pages/Home";
import DashboardLayout from "./ui/DashboardLayout";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/" element={<Authorization />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {protectedRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {dashBoardRoutes.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            })}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

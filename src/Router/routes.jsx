import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/Home";
import RegisterPage from "../Pages/Root/Register";
import LoginPage from "../Pages/Root/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

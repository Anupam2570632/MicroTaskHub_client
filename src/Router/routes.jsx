import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/Home";
import RegisterPage from "../Pages/Root/Register";
import LoginPage from "../Pages/Root/Login";
import PrivateRoute from "./PrivateRoute";
import TasksPage from "../Pages/Dashboard/AvailableTask";

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allTasks",
        element: (
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

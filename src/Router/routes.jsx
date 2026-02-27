import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/Home";
import RegisterPage from "../Pages/Root/Register";
import LoginPage from "../Pages/Root/Login";
import PrivateRoute from "./PrivateRoute";
import TasksPage from "../Pages/Dashboard/AvailableTask";
import AddTask from "../Pages/Dashboard/AddTask";
import Profile from "../Pages/Dashboard/Profile";
import TaskDetails from "../Pages/Dashboard/TaskDetails";
import MySubmission from "../Pages/Dashboard/MySubmission";
import Withdraw from "../Pages/Dashboard/Withdrawal";
import AdminWithdrawRequests from "../Pages/Dashboard/WithdrawRequests";

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
      {
        path: "/dashboard/addTask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/taskDetails/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/mySubmission",
        element: (
          <PrivateRoute>
            <MySubmission />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/withdrawalMoney",
        element: (
          <PrivateRoute>
            <Withdraw />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/withdrawalRequest",
        element: (
          <PrivateRoute>
            <AdminWithdrawRequests />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

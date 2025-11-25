import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <div className="h-[500px]">hello login</div>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
    ],
  },
]);

export default router;

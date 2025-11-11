import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";

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
]);

export default router;

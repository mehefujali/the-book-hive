import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/Pages/Home/Home";
import AllBooks from "@/Pages/AllBooks/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/Pages/Home/Home";
import AllBooks from "@/Pages/AllBooks/AllBooks";
import AddBook from "@/Pages/AddBook/AddBook";
import EditBook from "@/Pages/EditBook/EditBook";
import BorrowBook from "@/Pages/BorrowBook/BorrowBook";
import BorrowSummary from "@/Pages/BorrowSummary/BorrowSummary";
import BookDetails from "@/Pages/BookDetails/BookDetails";

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
      {
        path: "create-book",
        element: <AddBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:id",
        element: <BorrowBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
      {
        path: "book/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

export default router;

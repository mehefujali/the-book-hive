import type { IBook } from "@/types/types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetBooksQuery, useDeleteBookMutation } from "@/Redux/api/apiSlice";
import BookCard from "@/components/BookCard/BookCard";
import { FaPlus } from "react-icons/fa";

const AllBooks: React.FC = () => {
  const {
    data: booksResponse,
    isLoading,
    isError,
  } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        try {
          await deleteBook(id).unwrap();
          Swal.fire(
            "Deleted!",
            "The book has been successfully deleted.",
            "success"
          );
        } catch {
          Swal.fire("Error!", "There was an issue deleting the book.", "error");
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  const books = booksResponse?.data || [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Collection
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Explore our curated list of books.
            </p>
          </div>
          <NavLink
            to="/create-book"
            className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-teal-700"
          >
            <FaPlus />
            <span>Add New Book</span>
          </NavLink>
        </div>

        {isLoading && (
          <p className="text-center py-10 font-semibold">Loading Books...</p>
        )}
        {isError && (
          <p className="text-center py-10 font-semibold text-red-500">
            Failed to load books.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book: IBook) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={handleDelete}
                deletingId={deletingId}
                // Placeholder functions for Edit and Borrow
                onEdit={(b) => alert(`Editing: ${b.title}`)}
                onBorrow={(b) => alert(`Borrowing: ${b.title}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;

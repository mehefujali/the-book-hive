import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import BookCard from "@/components/BookCard/BookCard";
import { useGetBookQuery } from "@/Redux/api/apiSlice";

interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
}

const AllBooks: React.FC = () => {
  const handleDelete = (id: string) => {
    console.log(`Deleting book with id: ${id}`);
    alert(`Book with id ${id} would be deleted.`);
  };

  const { data: books, isLoading, isError } = useGetBookQuery();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books?.data?.map((book: IBook) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

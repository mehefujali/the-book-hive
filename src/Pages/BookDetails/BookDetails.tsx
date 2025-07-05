import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useGetBookByIdQuery } from "@/Redux/api/apiSlice"; // Adjust import path if needed
import { FaEdit, FaBookReader, FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bookResponse, isLoading, isError } = useGetBookByIdQuery(id!);

  const book = bookResponse?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen font-semibold">
        Loading Book Details...
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex justify-center items-center h-screen font-semibold text-red-500">
        Could not load book details.
      </div>
    );
  }

  return (
    <div className="bg-stone-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <NavLink
            to="/all-books"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline mb-6"
          >
            <FaArrowLeft />
            Back to Collection
          </NavLink>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1 bg-gray-100 dark:bg-gray-700/50 p-8 flex flex-col items-center justify-center">
                <FaBookOpen className="w-32 h-32 text-gray-300 dark:text-gray-600" />
              </div>

              <div className="md:col-span-2 p-8">
                <p className="text-sm font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  {book.genre}
                </p>
                <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mt-2">
                  {book.title}
                </h1>
                <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                  by {book.author}
                </p>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Description
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex-1 min-w-[150px]">
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                      ISBN
                    </p>
                    <p>{book.isbn}</p>
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                      Copies Available
                    </p>
                    <p
                      className={`font-bold ${
                        book.available
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                    >
                      {book.copies}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-wrap gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <NavLink to={`/borrow/${book._id}`}>
                      <FaBookReader className="mr-2" />
                      Borrow
                    </NavLink>
                  </Button>
                  <Button asChild variant="outline">
                    <NavLink to={`/edit-book/${book._id}`}>
                      <FaEdit className="mr-2" />
                      Edit
                    </NavLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

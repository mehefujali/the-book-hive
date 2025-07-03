import React from "react";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrash, FaBookReader } from "react-icons/fa";

interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  copies: number;
  available: boolean;
  // coverImage?: string; // Optional: boi er chobi thakle use korar jonno
}

interface BookCardProps {
  book: IBook;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const isDeleting = false; // Eta pore state theke asbe

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-shrink-0">
        {/* Placeholder for book cover image */}
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500">Book Cover</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
            {book.genre}
          </p>
          <NavLink to={`/books/${book._id}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {book.title}
            </p>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              by {book.author}
            </p>
          </NavLink>
        </div>

        <div className="mt-6">
          {book.available ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-200">
              Available ({book.copies} copies)
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200">
              Unavailable
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="flex items-center justify-around gap-2">
          <NavLink
            to={`/borrow/${book._id}`}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50"
            title="Borrow"
          >
            <FaBookReader size={16} />
            <span>Borrow</span>
          </NavLink>
          <NavLink
            to={`/edit-book/${book._id}`}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
            title="Edit"
          >
            <FaEdit size={16} />
          </NavLink>
          <button
            onClick={() => onDelete(book._id)}
            disabled={isDeleting}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/50"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

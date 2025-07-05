import type { IBook } from "@/types/types";
import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaBookReader, FaSpinner } from "react-icons/fa";

interface BookCardProps {
  book: IBook;
  onDelete: (id: string) => void;
  deletingId: string | null;
  // Add other props if needed
  onEdit: (book: IBook) => void;
  onBorrow: (book: IBook) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete, deletingId }) => {
  const isCurrentlyDeleting = deletingId === book._id;

  return (
    <div className="flex h-full flex-col rounded-lg border-l-4 border-teal-600 bg-stone-50 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-teal-500 dark:bg-gray-800">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <p className="font-sans text-sm font-medium uppercase tracking-wider text-teal-700 dark:text-teal-400">
            {book.genre}
          </p>
          <Link
            to={`/book/${book._id}`}
            className="font-serif text-2xl font-bold text-gray-900 dark:text-white mt-2"
          >
            {book.title}
          </Link>
          <p className="mt-3 font-sans text-base text-gray-500 dark:text-gray-400">
            by {book.author}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div>
            {book.available && book.copies ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-200">
                Available ({book.copies})
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200">
                Unavailable
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={`/borrow/${book._id}`}
              className="text-gray-400 transition hover:text-blue-500 dark:hover:text-blue-400"
              title="Borrow"
            >
              <FaBookReader size={18} />
            </Link>
            <Link
              to={`/edit-book/${book._id}`}
              className="text-gray-400 transition hover:text-indigo-500 dark:hover:text-indigo-400"
              title="Edit"
            >
              <FaEdit size={18} />
            </Link>
            <button
              onClick={() => onDelete(book._id)}
              disabled={isCurrentlyDeleting}
              className="text-gray-400 transition hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:text-red-400"
              title="Delete"
            >
              {isCurrentlyDeleting ? (
                <FaSpinner className="animate-spin" size={16} />
              ) : (
                <FaTrash size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

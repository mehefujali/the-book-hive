import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import BookCard from "@/components/BookCard/BookCard";

interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
}

const dummyBooks: IBook[] = [
  {
    _id: "64a5f1a3b4c5d6e7f8a9b0c1",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy Fiction",
    isbn: "978-0-7352-1129-2",
    copies: 15,
    available: true,
  },
  {
    _id: "64a5f2a3b4c5d6e7f8a9b0c2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    isbn: "978-0-593-13520-4",
    copies: 10,
    available: true,
  },
  {
    _id: "64a5f3a3b4c5d6e7f8a9b0c3",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    isbn: "978-0-7352-1129-2",
    copies: 0,
    available: false,
  },
  {
    _id: "64a5f4a3b4c5d6e7f8a9b0c4",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    genre: "Programming",
    isbn: "978-1-59327-950-9",
    copies: 25,
    available: true,
  },
  {
    _id: "64a5f5a3b4c5d6e7f8a9b0c5",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    isbn: "978-0-441-01359-3",
    copies: 7,
    available: true,
  },
];

const AllBooks: React.FC = () => {
  const handleDelete = (id: string) => {
    console.log(`Deleting book with id: ${id}`);
    alert(`Book with id ${id} would be deleted.`);
  };

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
          {dummyBooks.map((book: IBook) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const theme = {
  colors: {
    primary: {
      deepTeal: "#2A7A7B",
    },
    text: {
      primary: "#2F353D",
    },
  },
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between">
          <div>
            <NavLink to="/">
              <img
                className="h-10 w-auto dark:invert"
                src="/the-book-hive-logo.png"
                alt="The Book Hive Logo"
              />
            </NavLink>
            <p
              style={{ color: theme.colors.text.primary }}
              className="mt-2 text-sm dark:text-gray-300"
            >
              Minimal Library Management System
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            <NavLink
              to="/all-books"
              className="text-gray-600 transition hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            >
              All Books
            </NavLink>
            <NavLink
              to="/add-books"
              className="text-gray-600 transition hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            >
              Add Book
            </NavLink>
            <NavLink
              to="/borrow-summary"
              className="text-gray-600 transition hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            >
              Summary
            </NavLink>
          </nav>

          <div className="flex justify-center gap-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} The Book Hive. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

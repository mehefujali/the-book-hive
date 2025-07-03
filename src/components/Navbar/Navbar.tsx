import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../ToggleTheme";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "All Books", path: "/all-books" },
  { title: "Add Books", path: "/add-books" },
  { title: "Borrow Summary", path: "/borrow-summary" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md dark:shadow-gray-800">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div>
          <NavLink to="/">
            <img
              className="w-40 dark:invert"
              src="/the-book-hive-logo.png"
              alt="The Book Hive Logo"
            />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors hover:text-blue-500 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle Menu"
            >
              <HiMenuAlt3 size={28} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed right-0 top-0 z-50 flex h-full w-64 flex-col bg-white p-6 shadow-xl dark:bg-gray-900 md:hidden"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Menu
              </h2>
              <button
                onClick={toggleMenu}
                className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Close Menu"
              >
                <HiX size={28} />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  onClick={toggleMenu} // Close menu on link click
                  className={({ isActive }) =>
                    `rounded-md p-2 text-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

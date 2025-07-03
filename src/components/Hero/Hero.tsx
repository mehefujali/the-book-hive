import { NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import React from "react";

// Define your brand colors based on the logo
const theme = {
  colors: {
    primary: {
      deepTeal: "#2A7A7B", // Darker teal from the logo
      mediumTeal: "#3B9C9C", // Medium teal
      lightTeal: "#5FBCB3", // Lighter accent teal/green
    },
    text: {
      primary: "#2F353D", // Dark gray from "THE BOOK HIVE" text
      secondary: "#5E6A78", // A slightly lighter gray for paragraphs
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/50">
      <motion.div
        className="container mx-auto flex min-h-[calc(100vh-80px)] items-center px-4 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-3xl">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight dark:text-white sm:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            Welcome to{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.colors.primary.deepTeal}`,
              }}
              className="bg-clip-text text-transparent"
            >
              The Book Hive
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-8 dark:text-gray-300"
            variants={itemVariants}
          >
            Your minimalist digital library for discovering, managing, and
            borrowing books. Dive into a world of knowledge with a clean,
            seamless, and user-friendly experience.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            variants={itemVariants}
          >
            <NavLink
              to="/all-books"
              style={{ backgroundColor: theme.colors.primary.deepTeal }}
              className="rounded-md px-5 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Explore All Books
            </NavLink>
            <NavLink
              to="/add-books"
              className="group text-base font-semibold leading-6 transition-colors duration-300 hover:text-teal-600 dark:text-gray-100 dark:hover:text-teal-400"
            >
              Add a New Book{" "}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:ml-1"
              >
                →
              </span>
            </NavLink>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

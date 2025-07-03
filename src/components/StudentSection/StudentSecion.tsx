import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import studentImage from "../../assets/student.png";

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

const StudentSection: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img
              src={studentImage}
              alt="Student ready to learn"
              className="w-full max-w-sm rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">
              Empowering the Next Generation of Readers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              The Book Hive isn't just a library; it's the ultimate companion
              for a student's journey of discovery. Find all the academic and
              non-academic books you need, right at your fingertips.
            </p>
            <div className="mt-10">
              <NavLink
                to="/all-books"
                style={{ backgroundColor: theme.colors.primary.deepTeal }}
                className="inline-block rounded-md px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Start Exploring Books
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentSection;

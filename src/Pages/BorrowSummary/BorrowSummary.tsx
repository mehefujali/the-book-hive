import React from "react";
import { useGetBorrowsQuery } from "@/Redux/api/apiSlice"; // Adjust import path if needed
import { format } from "date-fns";

// Define the new types based on your API response
interface IBookInfo {
  _id: string;
  title: string;
}

interface IBorrowRecord {
  _id: string;
  book: IBookInfo | null;
  quantity: number;
  dueDate: string;
  createdAt: string;
}

// A helper function to determine the status of the borrowed book
const getBorrowStatus = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0); // Normalize today's date
  due.setHours(0, 0, 0, 0); // Normalize due date

  if (today > due) {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/50 dark:text-red-200">
        Overdue
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
      Active
    </span>
  );
};

const BorrowSummary: React.FC = () => {
  const {
    data: borrowResponse,
    isLoading,
    isError,
  } = useGetBorrowsQuery(undefined);

  const borrowRecords = borrowResponse?.data || [];

  if (isLoading) {
    return (
      <div className="text-center py-20 font-semibold text-xl">
        Loading Borrow History...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 font-semibold text-xl text-red-500">
        Failed to load history.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Borrow History
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            A detailed list of all borrowed books.
          </p>
        </div>

        {borrowRecords.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Book Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Borrow Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {borrowRecords.map((record: IBorrowRecord) => (
                  <tr
                    key={record._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-medium text-gray-900 dark:text-white">
                        {record.book ? (
                          record.book.title
                        ) : (
                          <span className="text-gray-400 italic">
                            Book not available
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                        {record.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(record.createdAt), "PP")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(record.dueDate), "PP")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getBorrowStatus(record.dueDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              No Borrow History
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              No books have been borrowed yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;

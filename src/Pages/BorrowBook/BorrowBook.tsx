import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  useGetBookByIdQuery,
  useBorrowBookMutation,
} from "@/Redux/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

// Zod schema for validation
const createBorrowFormSchema = (maxCopies: number) =>
  z.object({
    quantity: z.coerce
      .number()
      .min(1, "You must borrow at least 1 copy.")
      .max(maxCopies, `Only ${maxCopies} copies are available.`),
    dueDate: z.string().refine((date) => new Date(date) > new Date(), {
      message: "Due date must be a future date.",
    }),
  });

const BorrowBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: bookData,
    isLoading: isFetching,
    isError,
  } = useGetBookByIdQuery(id!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const availableCopies = bookData?.data?.copies || 0;
  const borrowFormSchema = createBorrowFormSchema(availableCopies);
  type BorrowFormValues = z.infer<typeof borrowFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormValues>({
    resolver: zodResolver(borrowFormSchema),
  });

  const onSubmit = async (values: BorrowFormValues) => {
    try {
      await borrowBook({
        book: id,
        ...values,
      }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary"); // Redirect to borrow summary page
    } catch {
      toast.error("Failed to borrow the book. It might be unavailable.");
    }
  };

  const inputClasses =
    "mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
  const labelClasses =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300";

  if (isFetching) {
    return <div className="text-center py-20">Loading book details...</div>;
  }

  if (isError || !bookData?.data) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load book data.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto max-w-lg px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Borrow Book
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              You are borrowing:{" "}
              <span className="font-bold text-teal-600 dark:text-teal-400">
                {bookData.data.title}
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Available Copies: {availableCopies}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantity" className={labelClasses}>
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  {...register("quantity")}
                  className={inputClasses}
                  placeholder="e.g., 1"
                  defaultValue={1}
                />
                {errors.quantity && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="dueDate" className={labelClasses}>
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  {...register("dueDate")}
                  className={inputClasses}
                />
                {errors.dueDate && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isBorrowing || availableCopies === 0}
                className="w-full flex justify-center rounded-md border border-transparent bg-teal-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isBorrowing ? "Processing..." : "Confirm Borrow"}
              </button>
            </div>
            {availableCopies === 0 && (
              <p className="text-center text-sm text-red-500 mt-4">
                This book is currently unavailable for borrowing.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;

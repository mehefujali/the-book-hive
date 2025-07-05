import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/Redux/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

const bookFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  author: z.string().min(2, "Author must be at least 2 characters."),
  genre: z.enum(genres, {
    errorMap: () => ({ message: "Please select a valid genre." }),
  }),
  isbn: z.string().min(10, "A valid ISBN is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  copies: z.coerce.number().min(0, "Copies cannot be negative."),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: bookData,
    isLoading: isFetching,
    isError,
  } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
  });

  useEffect(() => {
    if (bookData) {
      reset(bookData.data);
    }
  }, [bookData, reset]);

  const onSubmit = async (values: BookFormValues) => {
    try {
      await updateBook({ id, ...values }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/all-books");
    } catch {
      toast.error("Failed to update the book.");
    }
  };

  const inputClasses =
    "mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";
  const labelClasses =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300";

  if (isFetching) {
    return <div className="text-center py-20">Loading book details...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load book data.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Book
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Update the details for "{bookData?.data?.title}".
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className={labelClasses}>
                Book Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className={inputClasses}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="author" className={labelClasses}>
                Author
              </label>
              <input
                id="author"
                type="text"
                {...register("author")}
                className={inputClasses}
              />
              {errors.author && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className={labelClasses}>
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description")}
                className={inputClasses}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="genre" className={labelClasses}>
                  Genre
                </label>
                <select
                  id="genre"
                  {...register("genre")}
                  className={inputClasses}
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.genre.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="isbn" className={labelClasses}>
                  ISBN
                </label>
                <input
                  id="isbn"
                  type="text"
                  {...register("isbn")}
                  className={inputClasses}
                />
                {errors.isbn && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.isbn.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="copies" className={labelClasses}>
                Number of Copies
              </label>
              <input
                id="copies"
                type="number"
                {...register("copies")}
                className={inputClasses}
              />
              {errors.copies && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.copies.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full flex justify-center rounded-md border border-transparent bg-teal-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-300"
              >
                {isUpdating ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

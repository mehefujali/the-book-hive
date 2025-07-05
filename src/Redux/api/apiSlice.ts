import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (arg) => ({
        url: "/books",
        params: arg,
      }),
      providesTags: ["Books"],
    }),

    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (id) => [{ type: "Books", id }],
    }),

    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ({ id }) => [{ type: "Books", id }, "Books"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Books", "Borrows"],
    }),

    getBorrows: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrows"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowsQuery,
} = apiSlice;

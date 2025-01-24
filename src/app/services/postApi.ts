import type { Post } from "../types"
import { api } from "./api"

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, FormData>({
      query: formData => ({
        url: "/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),

    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),

    getPostById: builder.query<Post, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),

    editPost: builder.mutation<Post, Partial<Post>>({
      query: postData => ({
        url: `/posts/${postData.id}`,
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useEditPostMutation,
  useDeletePostMutation,
} = postApi

export const {
  endpoints: { createPost, getAllPosts, getPostById, editPost, deletePost },
} = postApi

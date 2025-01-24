import type { User } from "./../types"
import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),

    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: userData => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),

    getUserById: builder.query<User, string>({
      query: id => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useCurrentQuery,
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
  useLoginMutation,
  useRegisterMutation,
} = userApi

export const {
  endpoints: { login, register, current, getUserById },
} = userApi

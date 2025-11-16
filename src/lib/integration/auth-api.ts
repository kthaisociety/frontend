import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'userAuth', // unique key for this API in the store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),
  }),
});


export const { useGetPostsQuery, useGetPostByIdQuery } = api;

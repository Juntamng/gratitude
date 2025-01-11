import { createApi } from '@reduxjs/toolkit/query/react';
import { Gratitude, CreateGratitudeDto } from '../../types/gratitude';
import { baseQueryWithReauth } from './baseQuery';

export const gratitudeApi = createApi({
  reducerPath: 'gratitudeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Gratitude'],
  endpoints: (builder) => ({
    getGratitudes: builder.query<Gratitude[], void>({
      query: () => '/gratitudes',
      providesTags: ['Gratitude'],
    }),
    createGratitude: builder.mutation<Gratitude, CreateGratitudeDto>({
      query: (gratitude) => ({
        url: '/gratitudes',
        method: 'POST',
        body: gratitude,
      }),
      invalidatesTags: ['Gratitude'],
    }),
    toggleLike: builder.mutation<Gratitude, string>({
      query: (id) => ({
        url: `/gratitudes/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Gratitude'],
    }),
  }),
});

export const {
  useGetGratitudesQuery,
  useCreateGratitudeMutation,
  useToggleLikeMutation,
} = gratitudeApi; 
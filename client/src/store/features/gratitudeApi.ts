import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Gratitude, CreateGratitudeDto } from '../../types/gratitude';
import { RootState } from '../store';

export const gratitudeApi = createApi({
  reducerPath: 'gratitudeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    likeGratitude: builder.mutation<void, string>({
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
  useLikeGratitudeMutation,
} = gratitudeApi; 
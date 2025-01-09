import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  session: {
    access_token: string;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
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
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupCredentials>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi; 
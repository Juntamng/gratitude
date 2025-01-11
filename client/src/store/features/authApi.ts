import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { API_URL } from '../../config/constants';
import { setCredentials, logout } from './authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  data: {
    user: {
      id: string;
      email: string;
      name?: string;
    };
    session: {
      access_token: string;
    };
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error?.status === 401) {
    // Try to refresh token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const refreshResult = await baseQuery(
      { 
        url: '/auth/refresh',
        method: 'POST',
        body: { refresh_token: refreshToken }
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Store new token
      api.dispatch(setCredentials(refreshResult.data));
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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
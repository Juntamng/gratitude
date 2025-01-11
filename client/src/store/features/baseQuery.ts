import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { API_URL } from '../../config/constants';
import { setCredentials, logout } from './authSlice';

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

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error?.status === 401) {
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
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
}; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; session: { access_token: string } }>) => {
      state.token = action.payload.session.access_token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer; 
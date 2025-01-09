import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from './features/authSlice'
import { authApi } from './features/authApi'
import { gratitudeApi } from './features/gratitudeApi'

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [gratitudeApi.reducerPath]: gratitudeApi.reducer,
});

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify({ auth: state.auth });
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, gratitudeApi.middleware),
});

// Save auth state changes
store.subscribe(() => {
  saveState(store.getState());
});

// Export types and hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 
// Application constants
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-api-domain.vercel.app/api'
  : 'http://localhost:5001/api';
export const APP_NAME = 'Your App Name' 
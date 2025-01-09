import { UserData } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}

export {}; 
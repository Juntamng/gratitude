import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json({ data: result });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    const result = await AuthService.signup(email, password, name);
    res.json({ data: result });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    const result = await AuthService.refresh(refresh_token);
    res.json({ data: result });
  } catch (error: any) {
    console.error('Refresh error:', error);
    res.status(401).json({ message: 'Failed to refresh token' });
  }
}; 
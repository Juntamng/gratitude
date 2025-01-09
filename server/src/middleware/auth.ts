import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { UserData } from '../types/auth';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      id: user.id,
      email: user.email!,
      name: user.user_metadata.name || user.email!.split('@')[0]
    } as UserData;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
}; 
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name || email.split('@')[0]
      },
      token: data.session.access_token
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, name } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) throw error;

    res.json({
      user: {
        id: data.user!.id,
        email: data.user!.email,
        name: data.user!.user_metadata.name
      },
      token: data.session?.access_token
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 
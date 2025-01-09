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

    // Get profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, email')
      .eq('id', data.user.id)
      .single();

    res.json({
      user: {
        ...data.user,
        name: profile?.name || data.user.email?.split('@')[0]
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

    // Create profile
    await supabase
      .from('profiles')
      .insert([{ id: data.user!.id, email, name }]);

    res.json({
      user: {
        ...data.user,
        name
      },
      token: data.session?.access_token
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 
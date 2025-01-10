import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required environment variables SUPABASE_URL or SUPABASE_SERVICE_KEY');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.session || !data.user) {
      throw new Error('Authentication failed');
    }

    res.json({
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name
        },
        session: {
          access_token: data.session.access_token
        }
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // First check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists' 
      });
    }

    // Proceed with signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      },
    });

    if (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }

    if (!data.user) {
      throw new Error('Signup failed - no user returned');
    }

    // Return user data
    res.json({
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name
        },
        session: data.session && {
          access_token: data.session.access_token
        }
      }
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(400).json({ message: error.message });
  }
}; 
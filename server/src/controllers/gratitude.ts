import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createClient } from '@supabase/supabase-js';
import { Gratitude, CreateGratitudeDto, GratitudeResponse } from '../types/gratitude';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const transformGratitude = async (data: Gratitude): Promise<GratitudeResponse> => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email')
    .eq('id', data.user_id)
    .single();

  return {
    id: data.id,
    content: data.content,
    imageUrl: data.image_url,
    likes: data.likes,
    date: data.created_at,
    author: profile?.name || profile?.email?.split('@')[0] || 'Anonymous'
  };
};

export const getGratitudes = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('gratitudes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform each gratitude with profile data
    const gratitudes = await Promise.all((data || []).map(transformGratitude));

    res.json(gratitudes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createGratitude = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gratitudeData: CreateGratitudeDto = req.body;
    const user = req.user!;

    const { data, error } = await supabase
      .from('gratitudes')
      .insert([
        {
          content: gratitudeData.content,
          image_url: gratitudeData.imageUrl,
          user_id: user.id,
          likes: 0
        }
      ])
      .select('*')
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from database');

    const gratitude = await transformGratitude(data);
    res.status(201).json(gratitude);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const likeGratitude = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // First get current likes
    const { data: current, error: getError } = await supabase
      .from('gratitudes')
      .select('likes')
      .eq('id', id)
      .single();

    if (getError) throw getError;

    // Then update with incremented value
    const { data, error } = await supabase
      .from('gratitudes')
      .update({ likes: (current?.likes || 0) + 1 })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from database');

    const gratitude = await transformGratitude(data);
    res.json(gratitude);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 
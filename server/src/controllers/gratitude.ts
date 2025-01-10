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
    liked_by: data.liked_by || [],
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

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // First get current likes and liked_by array
    const { data: current, error: getError } = await supabase
      .from('gratitudes')
      .select('likes, liked_by')
      .eq('id', id)
      .single();

    if (getError) throw getError;

    const liked_by = current?.liked_by || [];
    const isLiked = liked_by.includes(userId);

    // Update likes count and liked_by array
    const { data, error } = await supabase
      .from('gratitudes')
      .update({ 
        likes: isLiked ? current.likes - 1 : current.likes + 1,
        liked_by: isLiked 
          ? liked_by.filter((id: string) => id !== userId)
          : [...liked_by, userId]
      })
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
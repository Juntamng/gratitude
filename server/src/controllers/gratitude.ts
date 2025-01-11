import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../config/supabase';
import { Gratitude, CreateGratitudeDto, GratitudeResponse, GratitudeWithProfile } from '../types/gratitude';

const formatGratitude = (gratitude: GratitudeWithProfile): GratitudeResponse => ({
  id: gratitude.id,
  content: gratitude.content,
  imageUrl: gratitude.image_url,
  likes: gratitude.likes,
  liked_by: gratitude.liked_by || [],
  date: gratitude.created_at,
  author: gratitude.profile.name || gratitude.profile.email.split('@')[0] || 'Anonymous',
  user_id: gratitude.user_id
});

export const getGratitudes = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('gratitudes')
      .select(`
        id, content, image_url, user_id, likes, liked_by, created_at,
        profile:profiles(name, email)
      `)
      .returns<GratitudeWithProfile[]>()
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json((data || []).map(formatGratitude));
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
    const { content, imageUrl } = req.body;
    const userId = req.user!.id;

    const { data, error } = await supabase
      .from('gratitudes')
      .insert([{
        content,
        image_url: imageUrl,
        user_id: userId,
        likes: 0
      }])
      .select(`
        id, content, image_url, user_id, likes, liked_by, created_at,
        profile:profiles(name, email)
      `)
      .returns<GratitudeWithProfile[]>()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from database');

    res.status(201).json(formatGratitude(data));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const { data: current, error: getError } = await supabase
      .from('gratitudes')
      .select('likes, liked_by')
      .eq('id', id)
      .single();

    if (getError) throw getError;

    const liked_by = current?.liked_by || [];
    const isLiked = liked_by.includes(userId);

    const { data, error } = await supabase
      .from('gratitudes')
      .update({ 
        likes: isLiked ? current.likes - 1 : current.likes + 1,
        liked_by: isLiked 
          ? liked_by.filter((id: string) => id !== userId)
          : [...liked_by, userId]
      })
      .eq('id', id)
      .select(`
        id, content, image_url, user_id, likes, liked_by, created_at,
        profile:profiles(name, email)
      `)
      .returns<GratitudeWithProfile[]>()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from database');

    res.json(formatGratitude(data));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 
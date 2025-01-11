import { supabase } from '../config/supabase';
import { GratitudeWithProfile, CreateGratitudeDto } from '../types/gratitude';

export class GratitudeService {
  static async getAll() {
    const { data, error } = await supabase
      .from('gratitudes')
      .select(`
        id, content, image_url, user_id, likes, liked_by, created_at,
        profile:profiles(name, email)
      `)
      .order('created_at', { ascending: false })
      .returns<GratitudeWithProfile[]>();

    if (error) throw error;
    return data || [];
  }

  static async create(dto: CreateGratitudeDto, userId: string) {
    const { data, error } = await supabase
      .from('gratitudes')
      .insert([{
        content: dto.content,
        image_url: dto.imageUrl,
        user_id: userId,
        likes: 0
      }])
      .select(`
        id, content, image_url, user_id, likes, liked_by, created_at,
        profile:profiles(name, email)
      `)
      .returns<GratitudeWithProfile>()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create gratitude');
    return data;
  }

  static async toggleLike(gratitudeId: string, userId: string) {
    const { data: current, error: getError } = await supabase
      .from('gratitudes')
      .select('likes, liked_by')
      .eq('id', gratitudeId)
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
      .eq('id', gratitudeId)
      .select(`
        id, content, image_url, user_id, likes, liked_by, created_at,
        profile:profiles(name, email)
      `)
      .returns<GratitudeWithProfile>()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update gratitude');
    return data;
  }
} 
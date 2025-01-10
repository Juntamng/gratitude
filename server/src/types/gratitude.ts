export interface Gratitude {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  liked_by: string[];
  user_id: string;
  created_at: string;
}

export interface CreateGratitudeDto {
  content: string;
  imageUrl?: string;
}

export interface GratitudeResponse {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  liked_by: string[];
  date: string;
  author: string;
} 
export interface Gratitude {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  user_id: string;
  created_at: string;
}

export interface CreateGratitudeDto {
  content: string;
  imageUrl?: string;
}

export interface GratitudeWithProfile extends Gratitude {
  profiles: {
    name: string;
    email: string;
  }[];
}

export interface GratitudeResponse {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  date: string;
  author: string;
} 
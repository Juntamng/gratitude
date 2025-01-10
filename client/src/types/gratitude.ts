export interface Gratitude {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  liked_by: string[];
  date: string;
  author: string;
}

export interface CreateGratitudeDto {
  content: string;
  imageUrl?: string;
} 
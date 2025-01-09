export interface Gratitude {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  date: string;
  author: string;
}

export interface CreateGratitudeDto {
  content: string;
  imageUrl?: string;
} 
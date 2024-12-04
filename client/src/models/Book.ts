import type { User } from "./User";

export interface Book {
  authors: string[],
  description: string;
  bookId: string;
  image: string;
  link: string;
  title: string;
  reviews?: Review[];
}

export interface Review {
  userId: User;
  review: string
  rating: number;
}

  // Agregar propiedad de add reviews
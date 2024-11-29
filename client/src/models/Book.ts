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
  username: string;
  rating: number;
  text: string;
}

  // Agregar propiedad de add reviews
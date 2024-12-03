import { Schema, model, type Document } from 'mongoose';

// Define the interface for reviews
export interface IReview {
  review: string;
  rating: number;
  userId: Schema.Types.ObjectId; // Reference to the User model
}

// Define the interface for books
export interface IBook extends Document {
  bookId: string; // Book identifier
  title: string; // Title of the book
  authors: string[]; // List of authors
  description: string; // Book description
  image: string; // URL to the book image
  link: string; // URL to the book's reference link
  reviews: IReview[]; // Array of reviews
  users: Schema.Types.ObjectId[]
}

// Define the review schema
const reviewSchema = new Schema<IReview>({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Refers to the User collection
    required: true,
  },
});

// Define the book schema
export const bookSchema = new Schema<IBook>({ // Add named export for bookSchema
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate book IDs
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema], // Embed the reviews as an array
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ]
});

// Create and export the Book model
const Book = model<IBook>('Book', bookSchema);

export default Book;

// utils/queries.ts
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

export const GET_BOOK = gql`
query Book($bookId: String!) {
  book(bookId: $bookId) {
    bookId
    title
    authors
    description
    image
    link
    reviews {
      review
      userId {
        username
      }
    }
  }
}
`;

// Agregar query de add reviews
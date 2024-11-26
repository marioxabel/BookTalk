// utils/mutations.ts
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// utils/mutations.ts

export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: BookInput!) {
    saveBook(bookInput: $bookInput) {
      id
      username
      email
      savedBooks {
        bookId
        title
      }
    }
  }
`;

// El resto de las mutaciones y funciones...


export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      id
      username
      email
      savedBooks {
        bookId
        title
      }
    }
  }
`;

// Agregar la mutation de add reviews


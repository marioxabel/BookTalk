// utils/mutations.ts
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
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
 mutation DeleteBook($bookId: String!) {
  deleteBook(bookId: $bookId)
}
`;

// Agregar la mutation de add reviews

export const ADD_FRIEND = gql`
  mutation addFriend($friend_id: String!) {
      addFriend(friend_id: $friend_id) {
        id    
        username
        email
        friends {
            id
            username
            email
        }
      }
  }
`

export const ADD_REVIEW = gql`
  mutation AddReview($bookId: String!, $reviewInput: ReviewInput!) {
    addReview(bookId: $bookId, reviewInput: $reviewInput) {
      bookId
      title
      reviews {
        userId
        review
      }
    }
  }
`
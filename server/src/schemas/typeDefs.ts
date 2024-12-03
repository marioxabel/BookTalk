const typeDefs = `
  type Book {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
    reviews: [Review] # Add reviews to the Book type
  }

  type Review {
    userId: User! # Reference to the user who wrote the review
    rating: Int!
    review: String! # The review text
  }

  type User {
    id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    friends: [User]
    bookCount: Int
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    me: User
    book(bookId: String!): Book
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveBook(bookInput: BookInput!): User
    deleteBook(bookId: String!): User
    addFriend(friend_id: String!): User
    addReview(bookId: String!, reviewInput: ReviewInput!): Book # Add the addReview mutation
  }

  input BookInput {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }

  input ReviewInput {
    review: String! # The review text
    rating: Int!
  }
`;

export default typeDefs;

import { IResolvers } from '@graphql-tools/utils';
import User, { IUser } from '../models/User.js';
import Book, { IBook } from '../models/Book.js';
import { AuthenticationError } from '../services/auth.js';
import { signToken } from '../services/auth.js';



const resolvers: IResolvers = {
    Query: {
        me: async (_, __, { user }): Promise<IUser | null> => {
            if (!user) throw new AuthenticationError('You must be logged in');
            try {
                const foundUser = await User.findById(user._id).populate('savedBooks');
                if (!foundUser) {
                    throw new Error('User not found');
                }
                return foundUser;
            } catch (err) {
                console.error('Error fetching user in me query:', err);
                throw new Error('Error fetching user');
            }
        },
    },
    Mutation: {
        createUser: async (
            _: unknown,
            { username, email, password }: { username: string; email: string; password: string }
        ): Promise<{ token: string; user: IUser }> => {
            try {
                const newUser = await User.create({ username, email, password }) as IUser;
                const token = signToken(newUser.username, newUser.email, newUser._id);
                return { token, user: newUser };
            } catch (error) {
                console.error("Error creating user:", error);
                throw new Error("User creation failed");
            }
        },
        login: async (
            _: unknown,
            { email, password }: { email: string; password: string }
        ): Promise<{ token: string; user: IUser }> => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (
            _: unknown,
            { bookInput }: { bookInput: IBook },
            { user }: { user: IUser }
        ): Promise<IUser> => {
            if (!user) throw new AuthenticationError('You must be logged in');

            const existingUser = await User.findById(user._id);
            if (!existingUser) throw new AuthenticationError('User not found');

            let existingBook = await Book.findOne({bookId: bookInput.bookId})
            if (!existingBook) {
                existingBook = await Book.create(bookInput)
            }

            // const existingBook = existingUser.savedBooks.some((book) => Book.bookId === bookInput.bookId);
            // if (existingBook) {
            //     throw new Error("Book is already saved.");
            // }

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $addToSet: { savedBooks: existingBook._id } },
                { new: true, runValidators: true }
            ).populate('savedBooks');

            await existingBook.updateOne({ $addToSet: {users: user._id}})
            await existingBook.save()

            if (!updatedUser) throw new Error('User not found');

            return updatedUser;
        },

        deleteBook: async (
            _: unknown,
            { bookId }: { bookId: string },
            { user }: { user: IUser }
        ): Promise<IUser> => {
            if (!user) throw new AuthenticationError('You must be logged in');

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).populate('savedBooks');

            if (!updatedUser) throw new Error('User not found');

            return updatedUser;
        },

        addFriend: async (
            _: unknown,
            { friend_id }: { friend_id: string },
            { user }: { user: IUser }
        ): Promise<IUser | null> => {
            if (!user) throw new AuthenticationError('You must be logged in');

            const alreadyFriend = await User.findOne({
                _id: user._id,
                friends: friend_id,
            });

            if (alreadyFriend) {
                throw new Error('Friend already added');
            }

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $push: { friends: friend_id } },
                { new: true }
            ).populate('friends');

            if (!updatedUser) throw new Error('User not found');

            return updatedUser;
        },

        addReview: async (
            _: unknown,
            { bookId, reviewInput }: { bookId: string; reviewInput: { review: string } },
            { user }: { user: IUser }
          ): Promise<IBook> => {
            if (!user) throw new AuthenticationError('You must be logged in');
          
            try {
              // Find the book by bookId in the user's savedBooks
              console.log(user._id)
              const book = await Book.findOne({ 
                bookId, 
                users: { $in: user._id}, 
                'reviews.userId': { $nin: user._id} 
                });
              console.log(book)
              if (!book) throw new Error('Book not found in user\'s savedBooks');
                
              
              // Add the review to the book's reviews array
              book.reviews.push({ review: reviewInput.review, userId: user._id });
          
              // Save the updated user document
              await book.save();
          
              return book; // Return the updated book
            } catch (err) {
              console.error(`Error adding review for bookId ${bookId}:`, err);
              throw new Error('Error adding review');
            }
          },
          
          
          
    },
};

export default resolvers;

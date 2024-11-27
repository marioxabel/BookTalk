import { IResolvers } from '@graphql-tools/utils';
import User, { IUser } from '../models/User.js'; // Importar el modelo User
import { IBook } from '../models/Book.js';
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
                console.error('Error fetching user:', err);
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

            const existingBook = user.savedBooks?.some((book) => book.bookId === bookInput.bookId);
            if (existingBook) {
                throw new Error("Book is already saved.");
            }

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $addToSet: { savedBooks: bookInput } },
                { new: true, runValidators: true }
            ).populate('savedBooks');

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
    },
};

export default resolvers;

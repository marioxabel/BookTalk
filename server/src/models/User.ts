import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  savedBooks: Schema.Types.ObjectId[]; // Array of embedded books
  friends: Schema.Types.ObjectId[]; // References to other users
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Use the `bookSchema` directly for embedded documents
    savedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Validate password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Virtual to calculate the number of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model<IUser>('User', userSchema);

export default User;

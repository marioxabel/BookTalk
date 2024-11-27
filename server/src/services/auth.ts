import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }: any) => {
  // Verifica que req existe
  if (!req) {
    console.log("Request object is undefined");
    return {};
  }

  // Cambia de const a let para permitir la reasignación
  let token = req.body?.token || req.query?.token || req.headers?.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // Si no hay token, simplemente retorna req sin lanzar error
  if (!token) {
    return req;
  }
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    // console.log("Decoded user data:", data);
    return { user: data }; 
  } catch (err) {
    console.error('Invalid token:', err);
    return {};
  }


};




export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};


import { Request } from 'express';
import { IUser } from './user'; 
import User from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
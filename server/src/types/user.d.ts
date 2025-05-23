import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Password can be optional on the interface if you set select: false
  avatar?: string;
  comparePassword(password: string): Promise<boolean>;
}
import { Document } from "mongoose"
import { IUser } from "./user"

export interface IUrl extends Document {
  full_url: string,
  short_url: string,
  clicks?: number,
  user: IUser['_id'] | IUser
}
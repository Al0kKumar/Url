import User from "../models/user.model"
import UrlModel from "../models/short_url.model"
import { IUser } from "../types/user"
import { IUrl } from "../types/url"

export const findUserByEmail = async (email: string): Promise<IUser | null>  => {
    return await User.findOne({email})
}

export const findUserByEmailByPassword = async (email: string): Promise<IUser | null> => {
    return await User.findOne({email}).select('+password')
}

export const findUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id)
}

export const createUser = async (name: string, email: string, password: string): Promise<IUser | null> => {
    const newUser = new User({name, email, password})
    await newUser.save()
    return newUser
}

export const getAllUserUrlsRepo = async (id: string): Promise<IUrl[]> => {
    return await UrlModel.find({user:id})
}
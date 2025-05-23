import { createUser, findUserByEmail, findUserByEmailByPassword } from "../repo/user.repo"
import { ConflictError } from "../utils/errorHandler"
import {signToken} from "../utils/helper"

export const registerUser = async (name: string, email: string, password: string) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    if (!newUser) throw new Error("Failed to create user")
    const token = await signToken((newUser._id as string).toString())
    return {token, user: newUser}
}

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmailByPassword(email)
    if(!user) throw new Error("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken(user._id as string)
    return {token,user}
}


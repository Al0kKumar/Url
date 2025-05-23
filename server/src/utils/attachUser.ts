import { findUserById } from "../repo/user.repo"
import { verifyToken } from "./helper"
import { Request,Response,NextFunction } from "express"

export const attachUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
    if(!token) return next()

    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded)
        if(!user) return next()
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        next()
    }
}
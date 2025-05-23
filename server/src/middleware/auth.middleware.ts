import { Request,Response,NextFunction } from "express"
import { findUserById } from "../repo/user.repo"
import { verifyToken } from "../utils/helper"


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json({message:"Unauthorized"})
    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded)
        if(!user) return res.status(401).json({message:"Unauthorized"})
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized",error})
    }
}
import { Request, Response } from "express"
import { cookieOptions } from "../config/config"
import { loginUser, registerUser } from "../services/auth.service"
import wrapAsync from "../utils/tryCatchWrapper"


export const register_user = wrapAsync( async (req: Request, res: Response) => {
    const {name, email, password} = req.body
    const {token,user} = await registerUser(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({message:"register success"})
})

export const login_user = wrapAsync( async (req: Request, res: Response) => {
    const {email, password} = req.body
    const {token,user} = await loginUser(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({user:user,message:"login success"})
})

export const logout_user = wrapAsync( async (req: Request, res: Response) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = wrapAsync( async (req: Request, res: Response) => {
    res.status(200).json({user:req.user})
})
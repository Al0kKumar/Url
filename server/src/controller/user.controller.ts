import wrapAsync from "../utils/tryCatchWrapper"
import { getAllUserUrlsRepo } from "../repo/user.repo"
import { Request, Response } from "express"

export const getAllUserUrls = wrapAsync(async (req: Request, res: Response) => {
    const {_id} = req.user
    const urls = await getAllUserUrlsRepo(_id)
    res.status(200).json({message:"success",urls})
})
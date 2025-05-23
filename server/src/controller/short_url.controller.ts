import { Request, Response } from "express"
import { getShortUrl } from "../repo/short_url"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service"
import wrapAsync from "../utils/tryCatchWrapper"

export const createShortUrl = wrapAsync(async (req: Request,res: Response)=>{
    const data = req.body
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})


export const redirectFromShortUrl = wrapAsync(async (req: Request,res: Response)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req: Request,res: Response)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})
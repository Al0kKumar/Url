import { IUrl } from "../types/url";
import { ConflictError } from "../utils/errorHandler";
import  URLschema  from "../models/short_url.model";

export const saveShortUrl = async (shortUrl: string, longUrl: string, userId?: string | undefined) => {
    try{
        const newUrl: IUrl = new URLschema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
    }catch(err: any){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl: string): Promise<IUrl | null> => {
    return await URLschema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug: string) => {
    return await URLschema.findOne({short_url:slug});
}
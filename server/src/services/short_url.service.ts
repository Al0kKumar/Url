import { generateNanoId } from "../utils/helper"
import { getCustomShortUrl, saveShortUrl } from "../repo/short_url"

export const createShortUrlWithoutUser = async (url: string) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    let userId;
    await saveShortUrl(shortUrl,url,userId);
    return shortUrl
}

export const createShortUrlWithUser = async (url: string,userId: string,slug: string) => {
    const shortUrl = slug || generateNanoId(7)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(shortUrl,url,userId)
    return shortUrl
}
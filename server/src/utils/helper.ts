import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config";
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length: number) =>{
    return nanoid(length);
}

export const signToken = (payload: string) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1h"})
}


export const verifyToken = (token: string) =>{

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string) as { id: string }
    console.log(decoded.id)
    return decoded.id
}
import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
import connectDB from "./src/config/mongo.config"
import short_url from "./src/routes/short_url.route"
import user_routes from "./src/routes/user.routes"
import auth_routes from "./src/routes/auth.routes"
import { redirectFromShortUrl } from "./src/controller/short_url.controller";
import { errorHandler } from "./src/utils/errorHandler";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();


const PORT = process.env.PORT as string;

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log(`Server is running on PORT: ${PORT}`);
})


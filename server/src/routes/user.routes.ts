import express from "express"
import { getAllUserUrls } from "../controller/user.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/urls",authMiddleware, getAllUserUrls)

export default router
import express from "express"
import { changePassword, getCurrentUser, login, logout, register } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = express.Router()


router.post("/register", register)
router.post("/login", login)

router.post("/logout", verifyJWT, logout)
router.get("/profile",verifyJWT, getCurrentUser)
router.post("/change-password", verifyJWT, changePassword)

export default router
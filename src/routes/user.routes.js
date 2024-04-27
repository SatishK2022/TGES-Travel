import express from "express"
import { changePassword, getCurrentUser, login, logout, register, updateProfile } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", login)

router.post("/logout", verifyJWT, logout)
router.get("/profile",verifyJWT, getCurrentUser)
router.post("/change-password", verifyJWT, changePassword)
router.patch("/update", verifyJWT, updateProfile)

export default router
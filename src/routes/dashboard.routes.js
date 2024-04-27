import express from "express"
import { authorizedRoles, verifyJWT } from "../middlewares/auth.middleware.js"
import { getUserList } from "../controllers/dashboard.controller.js"
const router = express.Router()

router
    .route("/")
    .get(verifyJWT, authorizedRoles("ADMIN"), getUserList)

export default router
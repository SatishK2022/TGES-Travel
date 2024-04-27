import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { airTravel, getTravelDetails, trainTravel } from "../controllers/travel.controller.js"
const router = express.Router()

router.post("/train", verifyJWT, trainTravel)
router.post("/air", verifyJWT, airTravel)
router.get("/travel-details", verifyJWT, getTravelDetails)

export default router
import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { airTravel, getCurrentUserTravelDetails, getTravelDetails, trainTravel } from "../controllers/travel.controller.js"
const router = express.Router()

router.post("/train", verifyJWT, trainTravel)
router.post("/air", verifyJWT, airTravel)
router.get("/travel-details", verifyJWT, getCurrentUserTravelDetails)
router.get("/travel-all/:id", verifyJWT, getTravelDetails)

export default router
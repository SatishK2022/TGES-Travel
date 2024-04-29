import { AirTravel } from "../models/airTravel.model.js";
import { TrainTravel } from "../models/trainTravel.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";


const trainTravel = asyncHandler(async (req, res) => {
    const { from, to, date, classOfTravel } = req.body

    if (!from || !to || !date || !classOfTravel) {
        return res.status(400).json({
            success: false,
            message: "All Fields are required",
        })
    }

    const trainTravel = await TrainTravel.create({
        from,
        to,
        date,
        classOfTravel,
        user: req.user._id
    })

    if (!trainTravel) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating train travel",
        })
    }

    return res.status(201).json(
        new ApiResponse(200, trainTravel, "Train travel created successfully")
    )
})

const airTravel = asyncHandler(async (req, res) => {
    const { from, to, date, classOfTravel } = req.body

    if (!from || !to || !date || !classOfTravel) {
        return res.status(400).json({
            success: false,
            message: "All Fields are required",
        })
    }

    const airTravel = await AirTravel.create({
        from,
        to,
        date,
        classOfTravel,
        user: req.user._id
    })

    if (!airTravel) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating air travel",
        })
    }

    return res.status(201).json(
        new ApiResponse(200, airTravel, "Air travel created successfully")
    )
})

const getCurrentUserTravelDetails = asyncHandler(async (req, res) => {
    const trainTravel = await TrainTravel.find({ user: req.user._id })
    const airTravel = await AirTravel.find({ user: req.user._id })
    const user = await User.findById(req.user._id).select("-password")

    return res.status(200).json(
        new ApiResponse(200, { user, trainTravel, airTravel }, "Travel details fetched successfully")
    )
})

const getTravelDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const trainTravel = await TrainTravel.find({ user: id })
    const airTravel = await AirTravel.find({ user: id })
    const user = await User.findById(id).select("-password")

    return res.status(200).json(
        new ApiResponse(200, { user, trainTravel, airTravel }, "Travel details fetched successfully")
    )
})

export {
    trainTravel,
    airTravel,
    getCurrentUserTravelDetails,
    getTravelDetails
}
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserList = asyncHandler(async (req, res) => {
    const users = await User.find({ 
        role: { 
            $ne: "ADMIN" 
        } 
    })

    return res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    )
})

export {
    getUserList
}
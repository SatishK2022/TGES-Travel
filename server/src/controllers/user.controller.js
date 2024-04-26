import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()

        await user.save({ validateBeforeSave: false });

        return { accessToken }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while generating access token",
        })
    }
}

const register = asyncHandler(async (req, res) => {
    const { fullName, email, city, password } = req.body

    if (!fullName || !email || !city || !password) {
        return res.status(400).json({
            success: false,
            message: "All Fields are required",
        })
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            success: false,
            message: "Enter a valid email",
        })
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return res.status(409).json({
            success: false,
            message: "User with email already exists",
        })
    }

    const user = await User.create({
        fullName,
        email,
        password,
        city
    })

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering user",
        })
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All Fields are required",
        })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist",
        })
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials",
        })
    }

    const { accessToken } = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
            }, "User Logged In Successfully")
        )
})

const logout = asyncHandler(async (req, res) => {
    res
        .status(200)
        .cookie("accessToken", null, { maxAge: 0 })
        .json(new ApiResponse(200, {}, "User Logged Out Successfully"))
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "All Fields are required",
        })
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist",
        })
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials",
        })
    }

    user.password = newPassword

    await user.save()

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password Changed Successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const user = await User.findById(_id).select("-password")

    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    )
})

export {
    register,
    login,
    logout,
    changePassword,
    getCurrentUser
}
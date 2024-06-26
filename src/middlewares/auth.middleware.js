import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token",
            })
        }

        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error?.message || "Invalid Access Token"
        })
    }
})

const authorizedRoles = (...roles) => (req, res, next) => {
    const currentRole = req.user.role;

    if (!roles.includes(currentRole)) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized access"
        })
    }

    next();
}

export {
    verifyJWT,
    authorizedRoles
}
import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is Required"],
        },
        city: {
            type: String,
            required: [true, "City is Required"],
        },
        country: {
            type: String,
            required: [true, "Country is Required"],
        },
        address: {
            type: String,
        },
        phone: {
            type: Number,
            maxWidth: 10
        },
        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER"],
            required: [true, "Gender is Required"],
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        },
    }, { timestamps: true, versionKey: false }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
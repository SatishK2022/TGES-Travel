import mongoose from "mongoose";

const airTravelSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, "Source location is required"]
    },
    to: {
        type: String,
        required: [true, "Destinaton location is required"]
    },
    date: {
        type: Date,
        required: [true, "Travel date is required"]
    },
    classOfTravel: {
        type: String,
        enum: ["ECONOMY", "BUSINESS", "FIRST"],
        default: "ECONOMY"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, versionKey: false })

export const AirTravel = mongoose.model("AirTravel", airTravelSchema)
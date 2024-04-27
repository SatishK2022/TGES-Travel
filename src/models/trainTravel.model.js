import mongoose from "mongoose";

const trainTravelSchema = new mongoose.Schema({
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
        enum: ["SL", "1AC", "2AC", "3AC"],
        default: "SL"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true, versionKey: false })

export const TrainTravel = mongoose.model("TrainTravel", trainTravelSchema)
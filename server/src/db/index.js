import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n✅ MongoDb Connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("❌ MONGODB CONNECTION FAILED: ", error);
        process.exit();
    }
}

export default connectDB;
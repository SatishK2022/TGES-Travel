import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error ", error)
            process.exit(1)
        })

        app.listen(process.env.PORT || 5001, () => {
            console.log(`⚙️ Server is listening on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("❌ MONGO DB Connection Failed !!", error)
    })
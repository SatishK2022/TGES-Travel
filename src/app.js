import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

// routes import
import userRouter from "./routes/user.routes.js"
import healthcheckRouter from "./routes/healthcheck.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import travelRouter from "./routes/travel.routes.js"

// routes decleration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/travel", travelRouter)


app.get("/", (req, res) => {
    res.send("Hello World")    
})

export { app }
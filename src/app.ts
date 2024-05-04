import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import { config } from "./config/config"
import connectDB from "./config/dbConnection"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import userRouter from "./user/userRouter"

const app = express()
const port = config.port || 8086
app.use(express.json())
app.use(cors())
app.use(morgan("dev"));

// DB Connection
connectDB()

//using the userRouter
app.use("/api/users",userRouter)

// Global error handler
app.use(globalErrorHandler)

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
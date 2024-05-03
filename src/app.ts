import express from "express"
import cors from "cors"
import morgan from "morgan"
import { config } from "./config/config"
import connectDB from "./config/dbConnection"

const app = express()
const port = config.port || 8086
app.use(express.json())
app.use(cors())
app.use(morgan("dev"));

// DB Connection
connectDB()




app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
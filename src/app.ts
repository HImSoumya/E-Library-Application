import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express()
const port = process.env.PORT || 8085
app.use(express.json())
app.use(cors())
app.use(morgan("dev"));




app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
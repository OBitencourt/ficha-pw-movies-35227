import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import morgan from 'morgan'
import directorsRoutes from './routes/directors.routes.js'
import moviesRoutes from './routes/movies.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'
import { getStats } from "./controllers/stats.controller.js"


const app = express()

configDotenv()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/directors", directorsRoutes)
app.use("/movies", moviesRoutes)
app.get("/stats", getStats)

app.use(errorMiddleware)

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})
import { Router } from "express"
import {
    getMovies,
    getMovie,
    createMovie,
    editMovie,
    deleteMovie,
    searchMovies
} from "../controllers/movie.controller.js"

const movieRoutes = Router()

movieRoutes.get("/", getMovies)
movieRoutes.get("/search", searchMovies)
movieRoutes.get("/:id", getMovie)
movieRoutes.post("/", createMovie)
movieRoutes.put("/:id", editMovie)
movieRoutes.delete("/:id", deleteMovie)

export default movieRoutes
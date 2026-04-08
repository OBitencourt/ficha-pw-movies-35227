import { Router } from "express";
import { createDirector, deleteDirector, editDirector, getDirector, getDirectorMovies, getDirectors } from "../controllers/director.controller.js";

const directorRoutes = Router()

directorRoutes.get("/", getDirectors)
directorRoutes.get("/:id", getDirector)
directorRoutes.post("/", createDirector)
directorRoutes.put("/:id", editDirector)
directorRoutes.delete("/:id", deleteDirector)
directorRoutes.get("/:id/movies", getDirectorMovies)

export default directorRoutes
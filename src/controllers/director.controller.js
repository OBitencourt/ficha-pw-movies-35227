import { createDirectorService, deleteDirectorService, editDirectorService, getDirectorMoviesService, getDirectorService, getDirectorsService } from "../services/director.service.js"


export const getDirectors = async (req, res) => {

    const { status, message, directors } = await getDirectorsService()


    res.status(status).json({ message: message, directors: directors ? directors : "Erro" })
}

export const getDirector = async (req, res) => {
    const { id } = req.params
    const { status, message, director } = await getDirectorService(id)

    if(!director) {
        return res.status(status).json({ message: message })
    }

    res.status(status).json({ message: message, director: director })
}

export const createDirector = async (req, res) => {
    const { name, birthYear } = req.body

    const { status, message, director } = await createDirectorService(name, birthYear)

    res.status(status).json({ message: message, director: director ? director : "Erro" })
}

export const editDirector = async (req, res) => {
    const { id } = req.params
    const { name, birthYear } = req.body

    const { status, message, director } = await editDirectorService(id, name, birthYear)

    res.status(status).json({ message: message, director: director })
}

export const deleteDirector = async (req, res) => {
    const { id } = req.params
    const { status, message, director} = await deleteDirectorService(id)


    res.status(status).json({ message: message, director: director ? director : "Erro" })
}

export const getDirectorMovies = async (req, res) => {
    const { id } = req.params
    const { status, message, movies} = await getDirectorMoviesService(id)

    res.status(status).json({ message: message, movies: movies ? movies : "Erro" })
}
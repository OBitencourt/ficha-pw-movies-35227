import {
    getMoviesService,
    getMovieService,
    createMovieService,
    editMovieService,
    deleteMovieService,
    searchMoviesService
} from "../services/movie.service.js"

export const getMovies = async (req, res) => {
    const { page, limit, sort } = req.query

    const { status, message, movies } = await getMoviesService(
        parseInt(page),
        parseInt(limit),
        sort
    )

    res.status(status).json({
        message: message,
        movies: movies ? movies : "Erro"
    })
}

export const getMovie = async (req, res) => {
    const { id } = req.params

    const { status, message, movie } = await getMovieService(id)

    if (!movie) {
        return res.status(status).json({ message })
    }

    res.status(status).json({ message, movie })
}

export const createMovie = async (req, res) => {
    const { title, releaseYear, directorId } = req.body

    const { status, message, movie } = await createMovieService(
        title,
        releaseYear,
        directorId
    )

    res.status(status).json({
        message,
        movie: movie ? movie : "Erro"
    })
}

export const editMovie = async (req, res) => {
    const { id } = req.params
    const { title, releaseYear, directorId } = req.body

    const { status, message, movie } = await editMovieService(
        id,
        title,
        releaseYear,
        directorId
    )

    res.status(status).json({ message, movie })
}

export const deleteMovie = async (req, res) => {
    const { id } = req.params

    const { status, message, movie } = await deleteMovieService(id)

    res.status(status).json({
        message,
        movie: movie ? movie : "Erro"
    })
}

export const searchMovies = async (req, res) => {
    const { title } = req.query

    const { status, message, movies } = await searchMoviesService(title)

    res.status(status).json({
        message,
        movies: movies ? movies : "Erro"
    })
}
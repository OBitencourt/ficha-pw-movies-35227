import prisma from "../prisma/prismaClient.js"

export const getMoviesService = async (page, limit, sort) => {

    let data = {}
    let orderBy = {}

    const pageNumber = page || 1
    const limitNumber = limit || 10
    const skip = (pageNumber - 1) * limitNumber

    if (sort === "releaseYear") {
        orderBy = { releaseYear: "asc" }
    }

    if (sort === "title") {
        orderBy = { title: "asc" }
    }

    if (page && !limit) {
        return data = {
            status: 404,
            message: "Forneça também o limite."
        }
    }

    if (!page && limit) {
        return data = {
            status: 404,
            message: "Forneça também a página."
        }
    }

    const movies = await prisma.movie.findMany({
        skip: skip,
        take: limitNumber,
        orderBy: orderBy,
        include: {
            director: true
        }
    })

    if (!movies || movies.length === 0) {
        return data = {
            status: 404,
            message: "Não há filmes cadastrados"
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao buscar filmes.",
        movies: movies
    }
}

export const getMovieService = async (id) => {
    let data = {}

    if (!id) {
        return data = {
            status: 404,
            message: "Forneça um id."
        }
    }

    const movie = await prisma.movie.findUnique({
        where: { id }
    })

    if (!movie) {
        return data = {
            status: 404,
            message: "Filme não encontrado."
        }
    }

    return data = {
        status: 200,
        message: "Filme encontrado com sucesso.",
        movie
    }
}

export const createMovieService = async (title, releaseYear, directorId) => {
    let data = {}

    if (!title || !releaseYear || !directorId) {
        return data = {
            status: 404,
            message: "Preencha todos os campos obrigatórios."
        }
    }

    const director = await prisma.director.findUnique({
        where: { id: directorId }
    })

    if (!director) {
        return data = {
            status: 404,
            message: "Director não existe."
        }
    }

    const movie = await prisma.movie.create({
        data: {
            title,
            releaseYear,
            directorId
        }
    })

    return data = {
        status: 200,
        message: "Filme criado com sucesso.",
        movie
    }
}

export const editMovieService = async (id, title, releaseYear, directorId) => {
    let data = {}

    const movieExists = await prisma.movie.findUnique({ where: { id } })

    if (!movieExists) {
        return data = {
            status: 404,
            message: "Filme não encontrado."
        }
    }

    if (!title && !releaseYear && !directorId) {
        return data = {
            status: 404,
            message: "Nenhum dado fornecido para edição."
        }
    }

    if (directorId) {
        const director = await prisma.director.findUnique({
            where: { id: directorId }
        })

        if (!director) {
            return data = {
                status: 404,
                message: "Director não existe."
            }
        }
    }

    const movie = await prisma.movie.update({
        where: { id },
        data: {
            title,
            releaseYear,
            directorId
        }
    })

    return data = {
        status: 200,
        message: "Filme atualizado com sucesso.",
        movie
    }
}

export const deleteMovieService = async (id) => {
    let data = {}

    const movieExists = await prisma.movie.findUnique({ where: { id } })

    if (!movieExists) {
        return data = {
            status: 404,
            message: "Filme não encontrado."
        }
    }

    const movie = await prisma.movie.delete({
        where: { id }
    })

    return data = {
        status: 200,
        message: "Filme deletado com sucesso.",
        movie
    }
}

export const searchMoviesService = async (title) => {
    let data = {}

    const movies = await prisma.movie.findMany({
        where: {
            title: {
                contains: title,
                mode: "insensitive"
            }
        }
    })

    if (movies.length === 0) {
        return data = {
            status: 404,
            message: "Nenhum filme encontrado."
        }
    }

    return data = {
        status: 200,
        message: "Filmes encontrados.",
        movies
    }
}
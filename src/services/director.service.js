import prisma from "../prisma/prismaClient.js"

export const getDirectorsService = async () => {
    let data = {}
    const directors = await prisma.director.findMany()

    if(directors.length === 0) {
        return data = {
            status: 404,
            message: "Não há diretores cadastrados"
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao buscar diretores.",
        directors: directors
    }
}

export const getDirectorService = async (id) => {
    let data = {}
    if(!id) {
        return data = {
            status: 404,
            message: "Forneça um id."
        }
    }

    const director = await prisma.director.findUnique({ where: { id: id } })

    if(!director) {
        return data = {
            status: 404,
            message: "Diretor não existe no banco de dados."
        }
    }

    return data = {
        status: 200,
        message: "Sucesso ao buscar diretor.",
        director: director
    }
}

export const createDirectorService = async (name, birthYear) => {
    let data = {}
    if(!name) {
        return data = {
            status: 404,
            message: "Forneça um nome."
        }
    }

    const director = await prisma.director.create({
        data: {
            name,
            birthYear
        }
    })

    return data = {
        status: 200,
        message: "Sucesso ao criar diretor.",
        director: director
    }
}

export const editDirectorService = async (id, name, birthYear) => {
    let data = {}
    const directorExists = await prisma.director.findUnique({ where: { id }})

    if (!directorExists) {
        return data = {
            status: 404,
            message: `O diretor com o id '${id}' não existe.`
        }
    }

    if (!name && !birthYear) {
        return data = {
            status: 404,
            message: `Nenhuma informação foi passada para que fosse realizada a edição.`
        }
    }

    const director = await prisma.director.update({
        where: {
            id
        },
        data: {
            name,
            birthYear
        }
    })

    return data = {
        status: 200,
        message: "Diretor editado com sucesso.",
        director: director
    }
}

export const deleteDirectorService = async (id) => {
    const directorExists = await prisma.director.findUnique({ where: { id }})
    let data = {}
    if(!directorExists) {
        return data = {
            status: 404,
            message: "Diretor não encontrado."
        }
    }

    const movies = await prisma.movie.deleteMany({ where: { directorId: id }})
    const director = await prisma.director.delete({ where: { id } })

    return data = {
        status: 200,
        message: "Sucesso ao deletar autor",
        director: director
    }
}

export const getDirectorMoviesService = async (id) => {
    const director = await prisma.director.findMany({ where: { id } })
    let data = {}
    if(!director) {
        return data = {
            status: 404,
            message: "O Diretor fornecido não existe no banco de dados."
        }
    }

    const movies = await prisma.movie.findMany({ where: { directorId: id } })

    if(movies.length === 0) {
        return data = {
            status: 404,
            message: "Filmes do diretor não foram encontrados."
        }
    }

    return data = {
        status: 200,
        message: "Filmes do diretor encontrados com sucesso.",
        movies: movies
    }
}
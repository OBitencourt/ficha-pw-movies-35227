import prisma from "../prisma/prismaClient.js"

export const getStatsService = async () => {
    let data = {}

    const totalMovies = await prisma.movie.count()
    const totalDirectors = await prisma.director.count()

    const avgMoviesPerDirector =
        totalDirectors === 0
            ? 0
            : totalMovies / totalDirectors

    return data = {
        status: 200,
        message: "Estatísticas obtidas com sucesso.",
        stats: {
            totalMovies,
            totalDirectors,
            avgMoviesPerDirector
        }
    }
}
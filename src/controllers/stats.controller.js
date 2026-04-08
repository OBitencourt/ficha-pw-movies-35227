import { getStatsService } from "../services/stats.service.js"

export const getStats = async (req, res) => {
    const { status, message, stats } = await getStatsService()

    res.status(status).json({
        message,
        stats: stats ? stats : "Erro"
    })
}
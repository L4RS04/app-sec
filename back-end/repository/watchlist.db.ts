import { Watchlist } from "../model/watchlist/watchlist";
import prisma from "./database";

const getWatchlistById = async (watchlistId: number): Promise<Watchlist | null> => {
    try {
        const watchlistPrisma = await prisma.watchlist.findUnique({
            where: {
                id: watchlistId,
            },
            include: { mediaItems: true, user: true },
        });
        return watchlistPrisma ? Watchlist.from(watchlistPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.')
    }
};

const getAllWatchlists  = async (): Promise<Watchlist[]> => {
    try {
        const watchlistsPrisma = await prisma.watchlist.findMany({
            include: { mediaItems: true, user: true }, 
        });
        return watchlistsPrisma.map((watchlistPrisma) => Watchlist.from(watchlistPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.')
    }
};

const deleteWatchlist = async (watchlistId: number) => {
    try {
        await prisma.watchlist.delete({
            where: {
                id: watchlistId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.')
    }
};


export default { 
    getWatchlistById,
    getAllWatchlists,
    deleteWatchlist,
 };







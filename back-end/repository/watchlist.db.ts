import { Watchlist } from "../model/watchlist";
import prisma from "./database";

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


export default { 
    getAllWatchlists,
 };







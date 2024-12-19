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

const getWatchlistsByUserId = async (userId: number): Promise<Watchlist[]> => {
    try {
        const watchlistsPrisma = await prisma.watchlist.findMany({
            where: {
                userId,
            },
            include: { mediaItems: true, user: true },
        });
        return watchlistsPrisma.map((watchlistPrisma) => Watchlist.from(watchlistPrisma));
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

const createWatchlist = async (watchlist: Watchlist): Promise<Watchlist> => {
    try {
        const watchlistPrisma = await prisma.watchlist.create({
            data: {
                name: watchlist.getName(),
                description: watchlist.getDescription(),
                user: {
                    connect: {
                        id: watchlist.getUser().getId(),
                    },
                },
            },
            include: { mediaItems: true, user: true },
        });
        return Watchlist.from(watchlistPrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.')
    }
};

const addMediaToWatchlist = async (watchlistId: number, mediaId: number) => {
    try {
        await prisma.watchlist.update({
            where: {
                id: watchlistId,
            },
            data: {
                mediaItems: {
                    connect: {
                        id: mediaId,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.')
    }
};

const updateWatchlist = async (watchlistId: number, updates: { name?: string, description?: string }) => {
    try {
        await prisma.watchlist.update({
            where: {
                id: watchlistId,
            },
            data: updates,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const deleteMediaFromWatchlist = async (watchlistId: number, mediaId: number) => {
    try {
        await prisma.watchlist.update({
            where: {
                id: watchlistId,
            },
            data: {
                mediaItems: {
                    disconnect: {
                        id: mediaId,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};


export default { 
    getWatchlistById,
    getAllWatchlists,
    deleteWatchlist,
    createWatchlist,
    getWatchlistsByUserId,
    addMediaToWatchlist,
    updateWatchlist,
    deleteMediaFromWatchlist,
 };







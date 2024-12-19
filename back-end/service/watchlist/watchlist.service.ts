import watchlistDb from "../../repository/watchlist.db";
import { Watchlist } from "../../model/watchlist/watchlist";
import userDb from "../../repository/user.db";
import { WatchlistInput } from "../../types";

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    return watchlistDb.getAllWatchlists();
};

const deleteWatchlist = async (watchlistId: number, id: number, userRole: string) => {
    const watchlist = await watchlistDb.getWatchlistById(watchlistId);

    if (!watchlist) {   
        throw new Error("Watchlist not found");
    }

    if (userRole !== 'ADMIN' && watchlist.getUser().getId() !== id) {
        throw new Error("Unauthorized to delete this watchlist");
    }

    return watchlistDb.deleteWatchlist(watchlistId);
};

const createWatchlist = async (watchlistInput: WatchlistInput, id: number, role: string): Promise<Watchlist> => {
    if (id === undefined) {
        throw new Error('User ID is undefined');
    }

    const user = await userDb.getUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    const userWatchlists = await watchlistDb.getWatchlistsByUserId(id) || []; // Initialize as empty array if undefined

    if (role === 'USER') {
        if (userWatchlists.length >= 1) {
            throw new Error('Normal users can only have one watchlist.');
        }
        if (watchlistInput.mediaItems && watchlistInput.mediaItems.length > 10) {
            throw new Error('Normal users can only have a maximum of 10 media items in their watchlist.');
        }
    }

    const watchlist = new Watchlist({
        name: watchlistInput.name,
        description: watchlistInput.description,
        user: user,
    });

    return watchlistDb.createWatchlist(watchlist);
}

const addMediaToWatchlist = async (watchlistId: number, mediaId: number, id: number, role: string) => {
    const watchlist = await watchlistDb.getWatchlistById(watchlistId);

    if (!watchlist) {
        throw new Error('Watchlist not found');
    }

    if (watchlist.getUser().getId() !== id) {
        throw new Error('Unauthorized to add media to this watchlist');
    }

    if (role === 'USER' && watchlist.getMedia().length > 10) {
        throw new Error('Normal users can only have a maximum of 10 media items in their watchlist.');
    }

    return watchlistDb.addMediaToWatchlist(watchlistId, mediaId);
};

const updateWatchlist = async (watchlistId: number, updates: { name?: string, description?: string }, userId: number, role: string) => {
    const watchlist = await watchlistDb.getWatchlistById(watchlistId);

    if (!watchlist) {
        throw new Error('Watchlist not found');
    }

    if (watchlist.getUser().getId() !== userId) {
        throw new Error('Unauthorized to update this watchlist');
    }

    return watchlistDb.updateWatchlist(watchlistId, updates);
};

const getWatchlistById = async (watchlistId: number): Promise<Watchlist | null> => {
    return watchlistDb.getWatchlistById(watchlistId);
}

const deleteMediaFromWatchlist = async (watchlistId: number, mediaId: number, userId: number, role: string) => {
    const watchlist = await watchlistDb.getWatchlistById(watchlistId);

    if (!watchlist) {
        throw new Error('Watchlist not found');
    }

    if (watchlist.getUser().getId() !== userId) {
        throw new Error('Unauthorized to delete media from this watchlist');
    }

    return watchlistDb.deleteMediaFromWatchlist(watchlistId, mediaId);
};

const WatchlistService = {
    getAllWatchlists,
    deleteWatchlist,
    createWatchlist,
    addMediaToWatchlist,
    updateWatchlist,
    getWatchlistById,
    deleteMediaFromWatchlist,
};

export default WatchlistService;
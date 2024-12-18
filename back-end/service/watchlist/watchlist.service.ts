import watchlistDb from "../../repository/watchlist.db";
import { Watchlist } from "../../model/watchlist/watchlist";

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    return watchlistDb.getAllWatchlists();
};

const deleteWatchlist = async (watchlistId: number, userId: number, userRole: string) => {
    const watchlist = await watchlistDb.getWatchlistById(watchlistId);

    if (!watchlist) {
        throw new Error("Watchlist not found");
    }

    if (userRole !== 'ADMIN' && watchlist.getUser().getId() !== userId) {
        throw new Error("Unauthorized to delete this watchlist");
    }

    return watchlistDb.deleteWatchlist(watchlistId);
};

const WatchlistService = {
    getAllWatchlists,
    deleteWatchlist,
};

export default WatchlistService;
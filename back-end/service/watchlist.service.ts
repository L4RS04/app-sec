import watchlistDb from "../repository/watchlist.db";
import { Watchlist } from "../model/watchlist";

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    return watchlistDb.getAllWatchlists();
};

const WatchlistService = {
    getAllWatchlists,
};

export default WatchlistService;
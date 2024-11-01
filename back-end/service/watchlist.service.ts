
import { Watchlist } from "../model/watchlist";
import { WatchlistInput } from "../types";
import userDb from "../repository/user.db";
import watchlistDb from "../repository/watchlist.db";


const createWatchlist = ({ name, description, creatorId}: WatchlistInput): Watchlist => {
    const creator = userDb.getUserById({ id: creatorId });

    if (!creator) {
        throw new Error('Creator not found');
    }

    const watchlist = new Watchlist({
        name,
        description,
        media_items: [],
        creator: creator
});

    creator.addWatchlistToUser(watchlist);
    watchlistDb.createWatchlist(watchlist);

    return watchlist;
}

const getAllWatchlists = async (): Promise<Watchlist[]> => watchlistDb.getAllWatchlists();

export default { createWatchlist, getAllWatchlists };

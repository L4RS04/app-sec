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

    const userWatchlists = await watchlistDb.getWatchlistsByUserId(id); 

    if (role === 'USER') {
        if (userWatchlists.length >= 1) {
            throw new Error('Normal users can only have one watchlist.');
        }
        if (watchlistInput.mediaItems.length > 10) {
            throw new Error('Normal users can only have a maximum of 10 media items in their watchlist.');
        }
    }

    const watchlist = new Watchlist({
        name: watchlistInput.name,
        description: watchlistInput.description,
        mediaItems: watchlistInput.mediaItems,
        user: user,
    });

    return watchlistDb.createWatchlist(watchlist);
}

const WatchlistService = {
    getAllWatchlists,
    deleteWatchlist,
    createWatchlist
};

export default WatchlistService;
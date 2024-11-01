import { Watchlist } from "../model/watchlist";

const watchlists: Watchlist[] = [];

const createWatchlist = (watchlist: Watchlist): Watchlist => {
    watchlists.push(watchlist);
    return watchlist;
};

const deleteWatchlist = (watchlist: Watchlist): void => {
    const index = watchlists.findIndex((w) => w === watchlist);
    if (index !== -1) {
        watchlists.splice(index, 1);
    }
}

const addMediaToWatchlist = (watchlist: Watchlist): void => {
    const index = watchlists.findIndex((w) => w.getId() === watchlist.getId());
    if (index !== -1) {
        watchlists[index] = watchlist;
    }
};

const getAllWatchlists = (): Watchlist[] => watchlists;

const getWatchlistById = (watchlistId: number): Watchlist | undefined => {
    return watchlists.find((w) => w.getId() === watchlistId);
}

export default { createWatchlist, deleteWatchlist, addMediaToWatchlist, getAllWatchlists, getWatchlistById };







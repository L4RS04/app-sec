import { watch } from "fs";
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

const getAllWatchlists = (): Watchlist[] => watchlists;

const getWatchlistById = (watchlistId: number): Watchlist | undefined => {
    return watchlists.find((w) => w.getId() === watchlistId);
}

export default { createWatchlist, deleteWatchlist, getAllWatchlists, getWatchlistById };







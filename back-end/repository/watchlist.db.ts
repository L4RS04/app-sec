import { watch } from "fs";
import { Watchlist } from "../model/watchlist";

const watchlists: Watchlist[] = [];

const createWatchlist = (watchlist: Watchlist): Watchlist => {
    watchlists.push(watchlist);
    return watchlist;
};

const getAllWatchlists = (): Watchlist[] => watchlists;

export default { createWatchlist, getAllWatchlists };







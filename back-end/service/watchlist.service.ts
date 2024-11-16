
// import { Watchlist } from "../model/watchlist";
// import { WatchlistInput } from "../types";
// import userDb from "../repository/user.db";
// import watchlistDb from "../repository/watchlist.db";
// import mediaDb from "../repository/media.db";

// let watchlistIdCounter = 0;

// const createWatchlist = ({ name, description, creatorId }: WatchlistInput): Watchlist => {
//     const creator = userDb.getUserById({ id: creatorId });

//     if (!creator) {
//         throw new Error('Creator not found');
//     }

//     const id = watchlistIdCounter++;
//     const watchlist = new Watchlist({
//         id,
//         name,
//         description,
//         media_items: [],
//         creator: creator
// });

//     creator.addWatchlistToUser(watchlist);
//     watchlistDb.createWatchlist(watchlist);

//     return watchlist;
// }

// const deleteWatchlist = (watchlistId: number): void => {
//     const watchlist = watchlistDb.getWatchlistById(watchlistId);

//     if (!watchlist) {
//         throw new Error('Watchlist not found');
//     }

//     watchlistDb.deleteWatchlist(watchlist);
// };

// const addMediaToWatchlist = (watchlistId: number, mediaId: number): Watchlist => {
//     const watchlist = watchlistDb.getWatchlistById(watchlistId);

//     if (!watchlist) {
//         throw new Error('Watchlist not found');
//     }

//     const media = mediaDb.getMediaById(mediaId);

//     if (!media) {
//         throw new Error('Media not found');
//     }

//     watchlist.addMediaToWatchlist(media);

//     return watchlist;
// }

// const deleteMediaFromWatchlist = (watchlistId: number, mediaId: number): Watchlist => {
//     const watchlist = watchlistDb.getWatchlistById(watchlistId);

//     if (!watchlist) {
//         throw new Error('Watchlist not found');
//     }

//     const media = mediaDb.getMediaById(mediaId);

//     if (!media) {
//         throw new Error('Media not found');
//     }

//     watchlist.removeMediaFromWatchlist(media);

//     return watchlist;
// }

// const getAllWatchlists = async (): Promise<Watchlist[]> => watchlistDb.getAllWatchlists();

// export default { createWatchlist, deleteWatchlist, addMediaToWatchlist, deleteMediaFromWatchlist, getAllWatchlists };

import express, { NextFunction, Request, Response } from 'express';
import watchlistService from "../../service/watchlist/watchlist.service";
import { WatchlistInput } from '../../types';

const watchlistRouter = express.Router();

watchlistRouter.get('/', async (req: Request, res: Response) => {
    try {
        const watchlists = await watchlistService.getAllWatchlists();
        res.status(200).json(watchlists);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

watchlistRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const watchlist = req.body as WatchlistInput;
        const request = req as Request & { auth: { id: number, role: string }};
        const { id, role } = request.auth;
        const result = await watchlistService.createWatchlist(watchlist, id, role);
        res.status(200).json(result);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

watchlistRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const request = req as Request & { auth: { id: number, role: string }};
        const { id, role } = request.auth;
        console.log(request.auth);
        await watchlistService.deleteWatchlist(watchlistId, id, role);
        res.status(200).json({ status: 'success', message: 'Watchlist deleted' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
    
});

// watchlistRouter.put('/:id/media/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const watchlistId = parseInt(req.params.id);
//         const mediaId = parseInt(req.params.mediaId);
//         const watchlist = await watchlistService.addMediaToWatchlist(watchlistId, mediaId);
//         res.status(200).json(watchlist.toJSON());
//     } catch (error) {
//         next(error);
//     }
// });

// watchlistRouter.delete('/:id/media/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const watchlistId = parseInt(req.params.id);
//         const mediaId = parseInt(req.params.mediaId);
//         const watchlist = await watchlistService.deleteMediaFromWatchlist(watchlistId, mediaId);
//         res.status(200).json(watchlist.toJSON());
//     } catch (error) {
//         next(error);
//     }
// });

export default watchlistRouter;
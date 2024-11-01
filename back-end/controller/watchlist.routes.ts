import express, { NextFunction, Request, Response } from 'express';
import watchlistService from "../service/watchlist.service";
import { WatchlistInput } from '../types';

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
        const watchlist = <WatchlistInput>req.body;
        const result = await watchlistService.createWatchlist(watchlist);
        res.status(200).json(result.toJSON());
    } catch (error) {
        next(error);
    }
});

watchlistRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const watchlistId = parseInt(req.params.id);
        await watchlistService.deleteWatchlist(watchlistId);
        res.status(200).json({ status: 'success', message: 'Watchlist deleted successfully' });
    } catch (error) {
        next(error);
    }
});

watchlistRouter.put('/:id/media/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const mediaId = parseInt(req.params.mediaId);
        const watchlist = await watchlistService.addMediaToWatchlist(watchlistId, mediaId);
        res.status(200).json(watchlist.toJSON());
    } catch (error) {
        next(error);
    }
});

watchlistRouter.delete('/:id/media/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const mediaId = parseInt(req.params.mediaId);
        const watchlist = await watchlistService.deleteMediaFromWatchlist(watchlistId, mediaId);
        res.status(200).json(watchlist.toJSON());
    } catch (error) {
        next(error);
    }
});

export default watchlistRouter;
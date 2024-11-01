import express, { Request, Response } from 'express';
import mediaService from "../service/media.service";

const mediaRouter = express.Router();

mediaRouter.get('/', async (req: Request, res: Response) => {
    try {
        const media = await mediaService.getAllMedia();
        res.status(200).json(media);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

mediaRouter.get('/movies', async (req: Request, res: Response) => {
    try {
        const movies = await mediaService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

mediaRouter.get('/series', async (req: Request, res: Response) => {
    try {
        const series = await mediaService.getAllSeries();
        res.status(200).json(series);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

export default mediaRouter;
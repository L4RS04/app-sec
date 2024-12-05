import express, { NextFunction, Request, Response } from 'express';
import mediaService from "../service/media.service";
import { MediaInput } from '../types';
import { Genre } from '../model/genre';

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

mediaRouter.get('/series', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const series = await mediaService.getAllSeries();
        res.status(200).json(series);
    } catch (error) {
        next(error); 
    }
});

mediaRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const media = <MediaInput>req.body;
        const result = await mediaService.createMedia(media);
        res.status(200).json(result);
    } catch (error) {
        next(error); 
    }
});

mediaRouter.get('/genres', async (req: Request, res: Response) => { 
    try {
        const genres = await mediaService.getAllGenres();
        res.status(200).json(genres);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

mediaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mediaId = parseInt(req.params.id);
        await mediaService.deleteMedia(mediaId);
        res.status(200).json({ status: 'success', message: 'Media deleted successfully' });
    } catch (error) {
        next(error); 
    }
});


export default mediaRouter;
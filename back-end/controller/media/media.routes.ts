import express, { Request, Response, NextFunction } from 'express';
import mediaService from '../../service/media/media.service';
import { MediaInput} from '../../types';
import { Role } from '../../model/user/role';


const mediaRouter = express.Router();

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Get all media
 *     description: Retrieve a list of all media items
 *     responses:
 *       200:
 *         description: A list of media items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   releaseYear:
 *                     type: integer
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                   type:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                     nullable: true
 *                   director:
 *                     type: string
 *                     nullable: true
 *                   numberOfSeasons:
 *                     type: integer
 *                     nullable: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
mediaRouter.get('/', async (req: Request, res: Response) => {
    try {
        const media = await mediaService.getAllMedia();
        res.status(200).json(media);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /media/movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a list of all movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   releaseYear:
 *                     type: integer
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                   type:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                   director:
 *                     type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
mediaRouter.get('/movies', async (req: Request, res: Response) => {
    try {
        const movies = await mediaService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /media/series:
 *   get:
 *     summary: Get all series
 *     description: Retrieve a list of all series
 *     responses:
 *       200:
 *         description: A list of series
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   releaseYear:
 *                     type: integer
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 *                   type:
 *                     type: string
 *                   numberOfSeasons:
 *                     type: integer
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
mediaRouter.get('/series', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const series = await mediaService.getAllSeries();
        res.status(200).json(series);
    } catch (error) {
        next(error); 
    }
});

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Create a new media item
 *     description: Create a new movie or series
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The test movie"
 *               description:
 *                 type: string
 *                 example: "A movie just made for testing!"
 *               releaseYear:
 *                 type: integer
 *                 example: 2021
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["ACTION"]
 *               type:
 *                 type: string
 *                 example: "MOVIE"
 *               director:
 *                 type: string
 *                 example: "Director Test"
 *               duration:
 *                 type: integer
 *                 example: 120
 *               numberOfSeasons:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Media item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "The test movie"
 *                 description:
 *                   type: string
 *                   example: "A movie just made for testing!"
 *                 releaseYear:
 *                   type: integer
 *                   example: 2021
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["ACTION"]
 *                 type:
 *                   type: string
 *                   example: "MOVIE"
 *                 director:
 *                   type: string
 *                   example: "Director Test"
 *                 duration:
 *                   type: integer
 *                   example: 120
 *                 numberOfSeasons:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
mediaRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { name: string, role: Role }};
        const { name, role } = request.auth;
        const media = req.body as MediaInput;
        const result = await mediaService.createMedia(media, role);
        res.status(200).json(result);
    } catch (error) {
        next(error); 
    }
});

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete a media item
 *     description: Delete a media item by ID (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the media item to delete
 *     responses:
 *       200:
 *         description: Media item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Media deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Admins only"
 */
mediaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { name: string, role: Role }};
        const { name, role } = request.auth;
        const mediaId = parseInt(req.params.id);
        await mediaService.deleteMedia(mediaId, role);
        res.status(200).json({ status: 'success', message: 'Media deleted successfully' });
    } catch (error) {
        next(error); 
    }
});

/**
 * @swagger
 * /media/genres:
 *   get:
 *     summary: Get all genres
 *     description: Retrieve a list of all genres
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
mediaRouter.get('/genres', async (req: Request, res: Response) => { 
    try {
        const genres = await mediaService.getAllGenres();
        res.status(200).json(genres);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

export default mediaRouter;
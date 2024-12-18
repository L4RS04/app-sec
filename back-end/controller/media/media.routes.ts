import express, { Request, Response, NextFunction } from 'express';
import mediaService from '../../service/media/media.service';
import { MediaInput } from '../../types';
import { Role } from '../../model/user/role';

const mediaRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MediaItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         releaseYear:
 *           type: integer
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *         type:
 *           type: string
 *           enum: ["MOVIE", "SERIES"]
 *         duration:
 *           type: integer
 *           nullable: true
 *         director:
 *           type: string
 *           nullable: true
 *         numberOfSeasons:
 *           type: integer
 *           nullable: true
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Get all media
 *     description: Retrieve a list of all media items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of media items successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MediaItem'
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
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
mediaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const media = await mediaService.getAllMedia();
        res.status(200).json(media);
    } catch (error) {
        next(error);
    }
});

mediaRouter.get('/series/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mediaId = parseInt(req.params.id);
        const series = await mediaService.getSeriesById(mediaId);
        res.status(200).json(series);
    } catch (error) {
        next(error);
    }
});

mediaRouter.get('/movies/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mediaId = parseInt(req.params.id);
        const movie = await mediaService.getMovieById(mediaId);
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /media/movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a list of all movies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of movies successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MediaItem'
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
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
mediaRouter.get('/movies', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await mediaService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /media/series:
 *   get:
 *     summary: Get all series
 *     description: Retrieve a list of all series
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of series successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MediaItem'
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MediaItem'
 *     responses:
 *       200:
 *         description: Media item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MediaItem'
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
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient permissions
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
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
 *       403:
 *         description: Forbidden - Admin access required
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of genres successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
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
mediaRouter.get('/genres', async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const genres = await mediaService.getAllGenres();
        res.status(200).json(genres);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /media/{id}:
 *   put:
 *     summary: Update an existing media item
 *     description: Update an existing movie or series
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the media item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MediaItem'
 *     responses:
 *       200:
 *         description: Media item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MediaItem'
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
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
mediaRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { name: string, role: Role }};
        const { name, role } = request.auth;
        const mediaId = parseInt(req.params.id);
        const media = req.body as MediaInput;
        const result = await mediaService.updateMedia(mediaId, media, role);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

export default mediaRouter;
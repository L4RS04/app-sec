import express, { NextFunction, Request, Response } from 'express';
import watchlistService from "../../service/watchlist/watchlist.service";
import { WatchlistInput } from '../../types';

const watchlistRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Watchlist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         userId:
 *           type: integer
 *         mediaItems:
 *           type: array
 *           items:
 *             type: object
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /watchlists:
 *   get:
 *     summary: Get all watchlists
 *     description: Retrieve a list of all watchlists
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of watchlists successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Watchlist'
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
watchlistRouter.get('/', async (req: Request, res: Response) => {
    try {
        const watchlists = await watchlistService.getAllWatchlists();
        res.status(200).json(watchlists);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /watchlists/{id}:
 *   get:
 *     summary: Get a watchlist by ID
 *     description: Retrieve a watchlist by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the watchlist to retrieve
 *     responses:
 *       200:
 *         description: Watchlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watchlist'
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
watchlistRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const watchlist = await watchlistService.getWatchlistById(watchlistId);
        res.status(200).json(watchlist);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /watchlists:
 *   post:
 *     summary: Create a new watchlist
 *     description: Create a new watchlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watchlist'
 *     responses:
 *       200:
 *         description: Watchlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watchlist'
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
 */
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

/**
 * @swagger
 * /watchlists/{id}:
 *   delete:
 *     summary: Delete a watchlist
 *     description: Delete a watchlist by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the watchlist to delete
 *     responses:
 *       200:
 *         description: Watchlist deleted successfully
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
 *                   example: Watchlist deleted
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
 */
watchlistRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const request = req as Request & { auth: { id: number, role: string }};
        const { id, role } = request.auth;
        await watchlistService.deleteWatchlist(watchlistId, id, role);
        res.status(200).json({ status: 'success', message: 'Watchlist deleted' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
    
});

/**
 * @swagger
 * /watchlists/{id}/media/{mediaId}:
 *   put:
 *     summary: Add media to a watchlist
 *     description: Add a media item to a watchlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the watchlist
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the media item to add
 *     responses:
 *       200:
 *         description: Media added to watchlist successfully
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
 *                   example: Media added to watchlist
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
 */
watchlistRouter.put('/:id/media/:mediaId', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const request = req as Request & { auth: { id: number, role: string }};
        const { id, role } = request.auth;
        const mediaId = parseInt(req.params.mediaId);
        await watchlistService.addMediaToWatchlist(watchlistId, mediaId, id, role);
        res.status(200).json({ status: 'success', message: 'Media added to watchlist' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /watchlists/{id}:
 *   put:
 *     summary: Update a watchlist
 *     description: Update a watchlist by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the watchlist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Watchlist'
 *     responses:
 *       200:
 *         description: Watchlist updated successfully
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
 *                   example: Watchlist updated
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
 */
watchlistRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const request = req as Request & { auth: { id: number, role: string }};
        const { id, role } = request.auth;
        const updates = req.body;
        await watchlistService.updateWatchlist(watchlistId, updates, id, role);
        res.status(200).json({ status: 'success', message: 'Watchlist updated' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /watchlists/{id}/media/{mediaId}:
 *   delete:
 *     summary: Delete media from a watchlist
 *     description: Delete a media item from a watchlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the watchlist
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the media item to delete
 *     responses:
 *       200:
 *         description: Media deleted from watchlist successfully
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
 *                   example: Media deleted from watchlist
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
 */
watchlistRouter.delete('/:id/media/:mediaId', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.id);
        const request = req as Request & { auth: { id: number, role: string }};
        const { id, role } = request.auth;
        const mediaId = parseInt(req.params.mediaId);
        await watchlistService.deleteMediaFromWatchlist(watchlistId, mediaId, id, role);
        res.status(200).json({ status: 'success', message: 'Media deleted from watchlist' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /watchlists/user/{id}:
 *   get:
 *     summary: Get watchlists by user ID
 *     description: Retrieve a list of watchlists by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of watchlists successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Watchlist'
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
watchlistRouter.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            throw new Error('Invalid user ID');
        }
        const watchlists = await watchlistService.getWatchlistsByUserId(userId);
        res.status(200).json(watchlists);
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error fetching watchlists:', errorMessage);
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

export default watchlistRouter;
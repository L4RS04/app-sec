import express, { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import userService from "../../service/user/user.service";
import { UserInput, UserLoginInput } from '../../types';
import { Role } from '../../model/user/role';

declare global {
    namespace Express {
        interface Request {
            user?: { role: Role; id: number };
        }
    }
}

const userRouter = express.Router();

// JWT middleware configuration
const jwtMiddleware = expressjwt({
    secret: process.env.JWT_SECRET || 'default_secret',
    algorithms: ['HS256'],
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: ['USER', 'ADMIN']
 *     UserRegistrationInput:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: Anakin
 *         password:
 *           type: string
 *           example: AnakinS123!
 *         email:
 *           type: string
 *           example: anakin@bingevault.com
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Xander
 *         password:
 *           type: string
 *           example: XanderD123!
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     description: Retrieve all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
userRouter.get('/', jwtMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.user?.role;
        if (role !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden - Admin access required' });
        }

        const users = await userService.getAllUsers(role);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * Public route – User login (No authentication required)
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = req.body as UserLoginInput;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ 
            message: "Authentication successful", 
            ...response 
        });
    } catch (error) {
        res.status(401).json({ status: 'error', message: (error as Error).message });
    }
});

/**
 * Public route – User registration (No authentication required)
 */
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = req.body as UserInput;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ status: 'error', message: errorMessage });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       403:
 *         description: Forbidden - Admin access required
 */
userRouter.delete('/:id', jwtMiddleware, async (req: Request, res: Response) => {
    const role = req.user?.role; // Extract role from the authenticated user
    const id = parseInt(req.params.id);

    if (role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }

    try {
        await userService.deleteUser(id, role);
        res.status(204).send(); // No Content
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

/**
 * Protected route – Change user password (Requires valid token)
 */
userRouter.post('/change-password', jwtMiddleware, async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id; // From express-jwt

    if (!userId) {
        return res.status(403).json({ error: 'Forbidden - User not authenticated' });
    }

    try {
        await userService.changePassword(userId, oldPassword, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

export default userRouter;
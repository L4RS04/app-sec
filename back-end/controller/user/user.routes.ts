import express, { Request, Response, NextFunction } from 'express';
import userService from "../../service/user/user.service";
import { UserInput, UserLoginInput } from '../../types';
import { Role } from '../../model/user/role';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { role: Role }};
        const { role } = request.auth;
        const users = await userService.getAllUsers(role);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ status: "error", message: (error as Error).message });
    }
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anakin
 *               password:
 *                 type: string
 *                 example: AnakinS123!
 *               email:
 *                 type: string
 *                 example: anakin@bingevault.com
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                   example: Anakin
 *                 email:
 *                   type: string
 *                   example: anakin@bingevault.com
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred whilst registering the user
 */
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: "error", message: (error as Error).message });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Xander
 *               password:
 *                 type: string
 *                 example: XanderD123!
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserLoginInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({message: "Authentication succesful", ...response });
    } catch (error) {
        res.status(401).json({ status: "error", message: (error as Error).message });
    }
});


export default userRouter;
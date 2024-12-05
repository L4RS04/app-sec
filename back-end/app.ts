import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './controller/user.routes';
import mediaRouter from './controller/media.routes';
import watchlistRouter from './controller/watchlist.routes';
import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';

const app = express();

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/users/login', '/users/register', '/status', '/api-docs', /^\/api-docs\/.*/],
    })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        console.error('UnauthorizedError:', err);
        res.status(401).json({ message: 'Invalid token' });
    } else {
        next(err);
    }
});


app.use('/users', userRouter);
app.use('/media', mediaRouter);
app.use('/watchlists', watchlistRouter);


app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BingeVault API',
            version: '1.0.0',
    },
},
apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

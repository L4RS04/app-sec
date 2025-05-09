import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './controller/user/user.routes';
import mediaRouter from './controller/media/media.routes';
import watchlistRouter from './controller/watchlist/watchlist.routes';
import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import logger from './logger'; // Import the logger

const app = express();
dotenv.config();

const port = process.env.APP_PORT || 3000;

// Middleware setup
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  })
);

app.use(cors({
    origin: 'http://localhost:8080',   // Replace with your frontend URL
    credentials: true,  // Allow credentials (cookies) to be sent
}));
app.use(bodyParser.json());

// Log JWT token from cookies
app.use((req, res, next) => {
  console.log("JWT Token: ", req.cookies.token);  // Check if token is present
  next();
});

if (!process.env.JWT_SECRET) {
    logger.warn("Warning: JWT_SECRET is not defined in .env!"); // Use logger for warnings
}

// JWT middleware
app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/users/login', '/users/register', '/status', '/api-docs', /^\/api-docs\/.*/],
    })
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        logger.error('Unauthorized access attempt', { message: err.message }); // Log unauthorized errors
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else {
        logger.error('Application error', { message: err.message }); // Log application errors
        res.status(400).json({ status: 'application error', message: err.message }); 
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Internal server error', { error: err }); // Log internal server errors
    res.status(500).json({ error: 'Internal server error' });
});

// Routers
app.use('/users', userRouter);
app.use('/media', mediaRouter);
app.use('/watchlists', watchlistRouter);

// Status endpoint
app.get('/status', (req, res) => {
    logger.info('Status endpoint accessed'); // Log status endpoint access
    res.json({ message: 'Back-end is running...' });
});

// Swagger setup
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BingeVault API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/**/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(port, () => {
    logger.info(`Back-end is running on port ${port}.`); // Log server start
});

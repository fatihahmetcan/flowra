import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middleware/errorMiddleware';
import { AppError } from './utils/AppError';
import customerRouter from './routes/customerRoutes';

const app: Application = express();

// Global MIddleware
app.use(cors());
app.use(express.json({ limit: '10kb'}));

// ROUTES
app.use('/customers', customerRouter)

// Health check remains for monitoring
app.get('/health-check', ( req: Request, res: Response ) => {
    res.status(200).json({ status: 'success', message: 'API is running'})
});


//UNHANDLE ROUTES
app.all('/{*path}', ( req: Request, res: Response, next ) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
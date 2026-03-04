import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middleware/errorMiddleware';
import { AppError } from './utils/AppError';

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: '10kb'}));

app.get('/health-check', ( req: Request, res: Response ) => {
    res.status(200).json({ status: 'success', message: 'API is running'})
});

app.all('/{*path}', ( req: Request, res: Response, next ) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
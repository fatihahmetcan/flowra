import { Request, Response, NextFunction } from 'express';

/**
 * Global error handling middleware.
 * Express trears this as an error handler because it has 4 para meters.
 */

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // Fallback values for unknown errors (e.g programming bugs)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        // In development we return full error details for debugging 
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    } else {

        if (err.isOperational) {
            // Known / trust errors (e.g. validation, not found)
            res.status(err.statusCode).json({
                code: err.status.toUpperCase(),
                message: err.message,
            });
        }else {
            // Unexpected programming errors should not leak internal details
            console.error('ERROR', err);
            res.status(500).json({
                code: 'INTERNAL_ERROR',
                message: "Something went wrong!"
            })
        }
    }
};
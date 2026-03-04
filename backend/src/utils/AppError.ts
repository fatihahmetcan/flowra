
export class AppError extends Error {

    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;

    constructor (message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;

        // HTTP 4xx errors are considered client failures, 5xx server errors
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Marks this error as expeted (opperational) so the global error handler 
        // can distilngush it from programming bugs
        this.isOperational = true;

        // Removes constuctor call from stack trace for cleaner debugging
        Error.captureStackTrace(this, this.constructor);

    }

}

import { Request, Response, NextFunction } from "express";

// A higher-order function that wraps asynchronous Express middlewares.
export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
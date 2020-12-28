import { NextFunction, RequestHandler, Request, Response } from 'express';

export const catchAsync = (fn: RequestHandler) => 
    (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next)

export const internalServerError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err.status) {
        console.error(err.stack)
    }
    res.status(err.status || 500).json({message: err.message || 'Something broke'})
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({message: 'Not Found'})
}
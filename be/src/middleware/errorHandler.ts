import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
  errors?: any[];
}

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err.statusCode) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors || undefined
    });
  } else {
    // Default error
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
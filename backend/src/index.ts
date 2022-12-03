import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import { CustomException } from './exceptions/CustomException';
import { ZodError } from 'zod';

const app = express();
app.use(express.json());

app.use(
  (
    error: CustomException | ZodError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof CustomException) {
      return res.status(error.code).json({
        message: error.message,
        code: error.code,
        name: error.name,
      });
    }

    if (error instanceof ZodError) {
      return res.status(400).json('oi');
    }

    console.error(error.message || error);

    return res.status(500).json({
      code: 500,
      message: 'Unexpected error',
    });
  }
);
export { app };

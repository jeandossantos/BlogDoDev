import 'express-async-errors';
import 'dotenv/config';

import swaggerUi from 'swagger-ui-express';
import path from 'node:path';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { CustomException } from './exceptions/CustomException';
import { ZodError } from 'zod';
import morgan from 'morgan';
import helmet from 'helmet';

import { routes as userRoutes } from './routes/user.routes';
import { routes as tagRoutes } from './routes/tag.routes';
import { routes as articleRoutes } from './routes/article.routes';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/static', express.static(path.resolve(__dirname, '..', 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('dev'));
app.use(userRoutes);
app.use(tagRoutes);
app.use(articleRoutes);
app.use('/terms', (req, res) =>
  res.json({
    terms: 'This are my terms!',
  })
);
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
      });
    }

    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }

    console.error(error.message || error);

    return res.status(500).json({
      code: 500,
      message: 'Unexpected error',
    });
  }
);
export { app };

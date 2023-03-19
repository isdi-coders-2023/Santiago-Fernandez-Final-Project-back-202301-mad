// Import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usersRouter } from './routers/users.router.js';
import createDebug from 'debug';
import { CustomError } from './interfaces/error.js';
import { productsRouter } from './routers/products.router.js';
// Import { __dirname } from './config.js';
const debug = createDebug('ERP:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

// Debug({ __dirname });
// App.use(express.static(path.resolve(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Santiago-Fernandez-Final-Project-back-202301-mad',
    endpoints: {
      users: '/users',
      products: '/products',
      productMovements: '/productmovements',
    },
  });
});

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);

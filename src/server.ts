'use strict';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { productRouter } from './routes/product.router.js';
import { initDB } from './utils/initDB.js';
import { userRouter } from './routes/user.router.js';
// import { orderRouter } from './routes/order.router.js';

dotenv.config();

// const { CLIENT_URL } = process.env;

// const corsOptions = {
//   origin: CLIENT_URL,
//   credentials: true,
// };

const corsOptions = {
  origin: '*',
};

export const createServer = () => {
  const app = express();

  initDB();
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use('/img', express.static(path.join('img')));
  app.use('/products', express.json(), productRouter);
  app.use('/user', express.json(), userRouter);
  // app.use('/checkout', express.json(), orderRouter);

  app.use('/', (_, res) => {
    res.send('Hello world, it is HTML Hooligans');
  });

  return app;
};

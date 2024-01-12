import express, { NextFunction } from 'express';
// import mongoose from 'mongoose';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
// import { signinRouter } from '@routes/signin';

import {
  errorHandler,
  NotFoundError,
} from '@webcafetickets/shared-auth-middleware';

const app = express();
app.set('trust proxy', true); // Trust traffic from ingress-nginx
app.use(json());

app.use(
  cookieSession({
    signed: false, // Not encrypted
    secure: process.env.NODE_ENV !== 'test', // Only use cookies if user is visiting our app over https connection
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//To catch all route that are not defined in our routes and throw error
app.all('*', (_, __, next: NextFunction) => {
  // next(new NotFoundError());
  throw new NotFoundError();
});

//Middleware
app.use(errorHandler);

export { app };

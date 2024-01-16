import express, { NextFunction } from 'express';

import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@webcafetickets/shared-auth-middleware';
import { createTicket } from './routes/new';
import { showTickets } from './routes/show';
import { allTickets } from './routes';
import { updateTicket } from './routes/update';

const app = express();
app.set('trust proxy', true); // Trust traffic from ingress-nginx
app.use(json());

app.use(
  cookieSession({
    signed: false, // Not encrypted
    secure: process.env.NODE_ENV !== 'test', // Only use cookies if user is visiting our app over https connection
  })
);
// check if currentUser has Session-cookie attach
app.use(currentUser);

//Routes
app.use(createTicket);
app.use(showTickets);
app.use(allTickets);
app.use(updateTicket);

app.all('*', (_, __, next: NextFunction) => {
  // next(new NotFoundError());
  throw new NotFoundError();
});

//Middleware
app.use(errorHandler);

export { app };

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import {
  validateRequest,
  BadRequestError,
} from '@webcafetickets/shared-auth-middleware';

import { Password } from '../services/password';

const router = express.Router();

/**
 * @ route POST /api/users/signin
 * @ desc Sign in a user
 * @ access Public
 * @ param email, password
 * @ return user
 */
router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email Must be Valid!'),
    body('password').trim().notEmpty(),
  ],
  // Validate express-validator body & password
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Does user Exists in AuthDB
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    //Check Password with storedPassword
    const userPass = await Password.comparePassword(
      existingUser.password,
      password
    );

    if (!userPass) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    // Add to jwt to cookie-session
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };

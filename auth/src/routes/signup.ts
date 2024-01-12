import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';

import { User } from '../models/user';
import {
  BadRequestError,
  validateRequest,
} from '@webcafetickets/shared-auth-middleware';

const router = express.Router();

/**
 * @ route POST /api/users/signup
 * @ desc create a user
 * @ access Public
 * @ body email, password
 */
router.post(
  '/api/users/signup',

  [
    body('email').isEmail().withMessage('Email must be Valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  // Validate express-validator body & password
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user already Existed
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User Already Exists');
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //add jwt to session object (cookie)
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

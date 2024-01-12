import express from 'express';
import { currentUser } from '@webcafetickets/shared-auth-middleware';
// import { isAuthenticated } from '../middleware/require-auth';

const router = express.Router();

/**
 * GOAL - to Verify the cookie
 * send appropriate response
 */
router.get(
  '/api/users/currentuser',
  currentUser,
  // isAuthenticated,
  (req, res) => {
    res.status(200).send({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };

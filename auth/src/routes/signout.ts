import express from 'express';

const router = express.Router();

/**
 * @ route POST /api/users/signout
 * @ desc Sign out a user
 * @ access Public
 * @ param email, password
 * @ return user
 */
router.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };

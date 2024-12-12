import express from 'express';
import { body } from 'express-validator';
import { register, login, getCurrentUser, getUserReviews } from '../controllers/authController';
import { authenticateUser } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().trim(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    validateRequest
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
    validateRequest
  ],
  login
);

router.get('/me', authenticateUser, getCurrentUser);
router.get('/users/:userId/reviews', authenticateUser, getUserReviews);

export default router;
import express from 'express';
import { 
  getProductReviews, 
  createReview,
  getUserReviews 
} from '../controllers/reviewController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/products/:productId', getProductReviews);
router.post('/products/:productId', authenticateUser, createReview);

router.get('/users/:userId', authenticateUser, getUserReviews);

export default router;
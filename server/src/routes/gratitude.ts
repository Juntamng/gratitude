import { Router } from 'express';
import { body } from 'express-validator';
import { getGratitudes, createGratitude, likeGratitude } from '../controllers/gratitude';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/', getGratitudes);

router.post('/',
  verifyToken,
  [
    body('content').notEmpty().trim(),
    body('imageUrl').optional({ nullable: true, checkFalsy: true }).isURL(),
  ],
  createGratitude
);

router.post('/:id/like', verifyToken, likeGratitude);

export { router as gratitudeRouter }; 
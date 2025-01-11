import { Router } from 'express';
import { body } from 'express-validator';
import { login, signup, refresh } from '../controllers/auth';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], login);

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
], signup);

router.post('/refresh', [
  body('refresh_token').notEmpty()
], refresh);

// Example protected route
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export { router as authRouter }; 
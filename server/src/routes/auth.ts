import { Router } from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/auth';

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

export { router as authRouter }; 
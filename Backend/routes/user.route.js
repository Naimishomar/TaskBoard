import express from 'express';
import { getProfile, login, register } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/get-profile').get(authMiddleware, getProfile);

export default router;
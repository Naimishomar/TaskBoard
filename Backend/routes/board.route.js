import express from 'express';
import { createBoard, deleteBoard, getBoards } from '../controllers/board.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.route('/get-boards').get(authMiddleware, getBoards);
router.route('/create-board').post(authMiddleware, createBoard);
router.route('/delete/:id').delete(authMiddleware, deleteBoard);
console.log("Loaded [task/board/user] routes");

export default router;
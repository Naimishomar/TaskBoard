import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router({ mergeParams: true });

router.route('/:boardId').get(authMiddleware, getTasks);
router.route('/:boardId').post(authMiddleware, createTask);
router.route('/:taskId').put(authMiddleware, updateTask);
router.route('/:taskId').delete(authMiddleware, deleteTask);
console.log("Loaded [task/board/user] routes");

export default router;
import express from 'express';
import { createTask, fetchTasks, updateTask, deleteTask } from '../controllers/tasks.js';
import auth from './../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createTask);
router.get('/', auth, fetchTasks);
router.patch('/update/:id', auth, updateTask);
router.delete('/delete/:id', auth, deleteTask);

export default router;
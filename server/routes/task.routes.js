import express from 'express';
import { createNewTask, deleteTask, getStudentTasks, getTeacherTasks, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/new-task', createNewTask);
router.patch('/update-task/:id', updateTask);
router.get('/get-student-tasks/:id', getStudentTasks);
router.get('/get-teacher-tasks/:id', getTeacherTasks);
router.post('/delete-task', deleteTask);

export default router;

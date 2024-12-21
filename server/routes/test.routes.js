import express from 'express';
import { createNewTest, updateTest, getStudentTests, getTeacherTests, deleteTest } from '../controllers/test.controller.js';

const router = express.Router();

router.post('/new-test', createNewTest);
router.patch('/update-test/:id', updateTest);
router.get('/get-student-tests/:id', getStudentTests);
router.get('/get-teacher-tests/:id', getTeacherTests);
router.post('/delete-test', deleteTest);

export default router;

import express from 'express';
import { logout, studentLogin, studentSignup, teacherLogin, teacherSignup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/teacher-signup', teacherSignup);
router.post('/teacher-login', teacherLogin);
router.post('/student-signup', studentSignup);
router.post('/student-login', studentLogin);
router.post('./logout', logout);

export default router;

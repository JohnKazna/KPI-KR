import express from 'express';
import { createNewPost, deletePost, getGroupPosts, getTeacherPosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/new-post', createNewPost);
router.patch('/update-post/:id', updatePost);
router.get('/teacher-posts/:id', getTeacherPosts);
router.get('/group-posts/:group', getGroupPosts);
router.delete('/delete-post/:id', deletePost);

export default router;

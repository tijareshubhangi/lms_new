import express from "express";

import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

import courseController2 from "../controllers/courseController2.js";

router.post('/courses', upload.single('courseImage'), courseController2.addCourse);

// Get all courses
router.get('/courses', courseController2.getAllCourses);
export default router;
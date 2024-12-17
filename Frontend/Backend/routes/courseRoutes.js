import express from "express";
<<<<<<< HEAD
=======

>>>>>>> 289ec6f157802e29f2ae8979fd65a007a654068f
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

import courseController2 from "../controllers/courseController2.js";

<<<<<<< HEAD
router.post('/courses', upload.fields([
  { name: 'courseImage', maxCount: 1 },
  { name: 'courseVideo', maxCount: 1 }
]), courseController2.addCourse);

// Get all courses
router.get('/courses', courseController2.getAllCourses);

export default router;

=======
router.post('/courses', upload.single('courseImage'), courseController2.addCourse);

// Get all courses
router.get('/courses', courseController2.getAllCourses);
export default router;
>>>>>>> 289ec6f157802e29f2ae8979fd65a007a654068f

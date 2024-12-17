import authModel from "../models/authModel.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";
import Course from "../models/courseModel.js"
class courseController2 {
  
  //new course add
  static addCourse = async (req, res) => {
    const {
      title,
      description,
      category,
      level,
      featured,
      videoUrl,
      tags,
      reviewerMessage,
      curriculum,
    } = req.body;

    try {
      if (!title || !description || !category || !level) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newCourse = new Course({
        title,
        description,
        category,
        level,
        featured: featured === 'true', // Convert string to boolean
        media: {
          imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
          videoUrl,
        },
        tags: tags ? tags.split(',') : [],
        reviewerMessage,
        curriculum: curriculum ? JSON.parse(curriculum) : [],
      });

      const savedCourse = await newCourse.save();
      return res.status(201).json({
        message: 'Course added successfully',
        course: savedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error adding course',
        error: error.message,
      });
    }
  };

  // Get all courses
  static getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find();
      if (courses.length === 0) {
        return res.status(404).json({ message: 'No courses found' });
      }
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching courses',
        error: error.message,
      });
    }
  };

  // Get a course by ID
  static getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching course',
        error: error.message,
      });
    }
  };

  // Update a course
  static updateCourse = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json({
        message: 'Course updated successfully',
        course: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating course',
        error: error.message,
      });
    }
  };

  // Delete a course
  static deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCourse = await Course.findByIdAndDelete(id);
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      return res.status(200).json({
        message: 'Course deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting course',
        error: error.message,
      });
    }
  };
}

export default courseController2;

import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import Course from "../models/courseModel.js";
// Define the uploads directory
const uploadsDir = path.resolve("./uploads");

// Ensure the uploads folder exists, create it if not
const ensureUploadsDirExists = () => {
  if (!fs.existsSync(uploadsDir)) {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory with recursive flag
      console.log("Uploads folder created.");
    } catch (error) {
      console.error("Error creating uploads folder:", error);
      throw new Error("Failed to create uploads folder.");
    }
  }
};

// Ensure the folder exists when the server starts
ensureUploadsDirExists();

// Define storage configuration for multer
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Set the destination folder for uploads
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_"); // Replace spaces in filenames
    const uniqueFilename = `${timestamp}-${sanitizedFilename}`;
    cb(null, uniqueFilename); // Use the unique filename
  },
});

// Define file filter to allow only specific file types (JPEG, PNG, JPG)
const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
const fileFilterConfig = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed!"), false);
  }
};

// Configure multer upload with storage, file size limit, and file filter
const uploadMiddleware = multer({
  storage: storageConfig,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilterConfig,
});

export default uploadMiddleware;

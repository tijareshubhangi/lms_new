import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import Course from "../models/courseModel.js";
// Define the uploads directory
const uploadsDir = path.resolve("./uploads");

<<<<<<< HEAD
const uploadsDir = path.resolve("./uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename while preserving the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
=======
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
>>>>>>> 289ec6f157802e29f2ae8979fd65a007a654068f
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, JPG, and MP4 are allowed."), false);
  }
};

<<<<<<< HEAD
const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: fileFilter
});

export default uploadMiddleware;

=======
// Configure multer upload with storage, file size limit, and file filter
const uploadMiddleware = multer({
  storage: storageConfig,
  limits: { fileSize: 1024 * 1024 * 50}, // Limit file size to 5MB
  fileFilter: fileFilterConfig,
});

export default uploadMiddleware;
>>>>>>> 289ec6f157802e29f2ae8979fd65a007a654068f

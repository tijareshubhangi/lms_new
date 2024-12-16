import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import authController from "../controllers/authController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
import UserModel from "../models/authModel.js";

const router = express.Router();

// User Authentication Routes
router.post("/users/register", authController.userRegistration);
router.post("/users/login", authController.userLogin);

// Password Management Routes
router.post("/changePassword", authController.newPassword);
router.post("/send-email", authController.courseEmail);
router.post("/forget-password", authController.forgetPassword);
router.post("/forget-password/:id/:token", authController.forgetPasswordEmail);

// Email Verification Route
router.get("/verify/:token", authController.saveVerifiedEmail);

// Protected Routes
router.post(
  "/change-password",
  checkIsUserAuthenticated,
  authController.changePassword
);

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), "Public/Allimages")); // Corrected file path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to Upload User Image
router.post("/upload/:userId", upload.single("file"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const uploadedFileName = req.file.filename;

    // Update User with Uploaded Image in the Database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { images: { filename: uploadedFileName } } }, // Ensures correct structure
      { new: true, upsert: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with updated images array
    res.json({
      success: true,
      imageFile: uploadedFileName,
      images: updatedUser.images,
    });
  } catch (error) {
    console.error("Error during upload:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get User's Current Name
router.get("/getName/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      success: true,
      name: { firstName: user.firstName, lastName: user.lastName },
    });
  } catch (error) {
    console.error("Error fetching name:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Update user's name
router.put('/updateName/:userId', async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

   try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      success: true,
      updatedFirstName: updatedUser.firstName,
      updatedLastName: updatedUser.lastName,
    });
  } catch (err) {
    console.error("Error updating name:", err);
    res.status(500).json({ error: "Failed to update name." });
  }
});


export default router;

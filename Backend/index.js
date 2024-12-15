// Import Dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import multer from "multer";
// Import Custom Modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
// Initialize Express App
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Parse JSON data
app.use(bodyParser.json());

// Parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure Public/Allimages Directory Exists
const folderPath = path.join(path.resolve(), "Public/Allimages"); // Use path.resolve for __dirname replacement in ES modules
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}


// Serve Static Files
app.use('/public', express.static(path.join(path.resolve(), 'Public')));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is Running..");
});
app.use("/api/auth", authRoutes);
app.use('/api/auth', courseRoutes);
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

app.post('/api/auth/courses', upload.single('video'), (req, res) => {
  try {
    // Handle course creation logic here
    // req.file contains the uploaded file information
    // req.body contains the text fields

    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});




// Temporary storage for OTPs (for demo purposes; consider using a database in production)
const otpStore = {};

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const timestamp = Date.now(); // Capture the time when OTP is generated

  otpStore[email] = { otp, timestamp }; // Store OTP with timestamp

  // Configure Nodemailer with environment variables
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully to ' + email });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
});

app.post('/verify-otp', (req, res) => {
  const { email, userOtp } = req.body;
  if (!email || !userOtp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const otpData = otpStore[email];
  if (!otpData) {
    return res.status(400).json({ message: 'No OTP sent to this email' });
  }

  // Check if OTP has expired (60 seconds limit)
  const expiryTime = 60 * 1000; // 60 seconds
  const isExpired = Date.now() - otpData.timestamp > expiryTime;

  if (isExpired) {
    delete otpStore[email]; // Remove expired OTP
    return res.status(400).json({ message: 'OTP has expired' });
  }

  // Validate OTP
  if (otpData.otp == userOtp) {
    delete otpStore[email]; // Remove OTP after successful verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});
// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
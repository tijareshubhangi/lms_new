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
import QRCode from "qrcode";

// Import Custom Modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";


// __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express App
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// Connect to Database
connectDB();



// Define allowed origins (you can include both localhost and public IP for production)
const allowedOrigins = ['http://localhost:3000', 'http://13.232.95.214:9000','http://13.232.95.214','http://13.232.95.214:3000'];

// CORS middleware with dynamic origin handling
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true // Allow cookies and credentials
}));


// Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../build")));

// Handle React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Ensure Public/Allimages Directory Exists
const folderPath = path.join(path.resolve(), "Public/Allimages"); // Use path.resolve for __dirname replacement in ES modules
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Serve Static Files
app.use("/public", express.static(path.join(path.resolve(), "Public/Allimages")));
app.use('/public', express.static(path.join(path.resolve(), 'Public')));
app.use('/Videos', express.static(path.join(__dirname, 'videos'))); // Serve static videos

const videos = [];

// Multer Storage Engine for Video Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'videos')); // Destination for video uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filenames
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend is Running..");
});
app.use("/api/auth", authRoutes);
app.use("/api/auth", courseRoutes);
app.use("/uploads", express.static("uploads"));

// Video Upload Route
app.post('/api/upload', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const newVideo = {
    id: Date.now(),
    title: req.body.title,
    videoUrl: `${req.protocol}://${req.get('host')}/Videos/${req.file.filename}`,
  };
  videos.push(newVideo);

  res.status(200).json({ message: 'Video uploaded successfully', video: newVideo });
});

// Get All Videos
app.get('/api/videos', (req, res) => res.status(200).json(videos));

// Temporary storage for OTPs (for demo purposes; consider using a database in production)
const otpStore = {};

// Send OTP route
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const timestamp = Date.now(); // Capture the time when OTP is generated

  otpStore[email] = { otp, timestamp }; // Store OTP with timestamp

  // Configure Nodemailer with environment variables
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `OTP sent successfully to ${email}` });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

// Verify OTP route
app.post("/verify-otp", (req, res) => {
  const { email, userOtp } = req.body;
  if (!email || !userOtp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const otpData = otpStore[email];
  if (!otpData) {
    return res.status(400).json({ message: "No OTP sent to this email" });
  }

  // Check if OTP has expired (60 seconds limit)
  const expiryTime = 60 * 1000; // 60 seconds
  const isExpired = Date.now() - otpData.timestamp > expiryTime;

  if (isExpired) {
    delete otpStore[email]; // Remove expired OTP
    return res.status(400).json({ message: "OTP has expired" });
  }

  // Validate OTP
  if (otpData.otp == userOtp) {
    delete otpStore[email]; // Remove OTP after successful verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// Generate QR Code
app.post("/generate-qr", async (req, res) => {
  const { user, amount } = req.body;

  // Use "INR" for currency in the QR data
  const qrData = `Payment Request:\nUser: ${user}\nAmount: INR ${amount}`;

  try {
    const qrCode = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: "H",
    }); // High error correction level
    res.status(200).json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Sample route to Save User
app.post("/api/users/save", (req, res) => {
  const { name, email, photo } = req.body;
  if (!name || !email || !photo) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Mock response
  res.status(201).json({ message: "User saved successfully" });
});

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API is running on http://13.232.95.214:${PORT}`);
});

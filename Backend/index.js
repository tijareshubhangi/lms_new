import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);
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


// Connect to the Database 
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure Public/Allimages Directory Exists
const folderPath = path.join(path.resolve(), "Public/Allimages"); 
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Serve Static Files
app.use('/public', express.static(path.join(path.resolve(), 'Public')));
app.use('/Videos', express.static(path.join(__dirname, 'videos'))); // Serve static videos

// Video and Purchase Data Storage (In-Memory for simplicity)
const videos = [];
const purchaseRecords = [];

// Multer Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'videos')); // Destination for video uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filenames
  },
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  res.send('Backend is Running..');
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Video Upload Route
app.post('/api/upload', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
 
  const newVideo = {
    id: Date.now(),
    title: req.body.title,
    videoUrl: `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`,
  };
  videos.push(newVideo);

  res.status(200).json({ message: 'Video uploaded successfully', video: newVideo });
});

// Get All Videos
app.get('/api/videos', (req, res) => res.status(200).json(videos));

// Delete Video Route
app.delete('/api/videos/:id', (req, res) => {
  const videoId = parseInt(req.params.id);
  const videoIndex = videos.findIndex((video) => video.id === videoId);

  if (videoIndex === -1) return res.status(404).json({ message: 'Video not found' });

  const deletedVideo = videos.splice(videoIndex, 1)[0];
  const filePath = path.join(__dirname, 'videos', path.basename(deletedVideo.videoUrl));

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete video file', error: err.message });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  });
});

// Start the Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));

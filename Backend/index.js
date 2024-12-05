import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Temporary store for OTPs
const otpStore = {};

// Send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const timestamp = Date.now();

  otpStore[email] = { otp, timestamp };

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
    text: `Your OTP code is ${otp}. It is valid for 60 seconds.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully to ' + email });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, userOtp } = req.body;

  if (!email || !userOtp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const otpData = otpStore[email];
  if (!otpData) {
    return res.status(400).json({ message: 'No OTP sent to this email' });
  }

  const isExpired = Date.now() - otpData.timestamp > 60 * 1000; // 60 seconds expiry
  if (isExpired) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (otpData.otp == userOtp) {
    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

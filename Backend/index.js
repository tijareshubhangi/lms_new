// Import Dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import QRCode from "qrcode";

// Import Custom Modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Corrected import statement

// Initialize Express App
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure Public/Allimages Directory Exists
const folderPath = path.join(path.resolve(), "Public/Allimages");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Serve Static Files
app.use("/public", express.static(path.join(path.resolve(), "Public")));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is Running..");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.post("/generate-qr", async (req, res) => {
  const { user, amount } = req.body;
  const qrData = `Payment Request:\nUser: ${user}\nAmount: INR ${amount}`;

  try {
    const qrCode = await QRCode.toDataURL(qrData, { errorCorrectionLevel: "H" });
    res.status(200).json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.post("/verify-payment", (req, res) => {
  res.status(200).json({ message: "Payment Successful" });
});


// Sample route
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
  console.log(`API is running on http://localhost:${PORT}`);
});

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



app.post("/generate-qr", async (req, res) => {
  const { user, amount } = req.body;

  // Use "INR" for currency in the QR data
  const qrData = `Payment Request:\nUser: ${user}\nAmount: INR ${amount}`;

  try {
    const qrCode = await QRCode.toDataURL(qrData, { errorCorrectionLevel: "H" }); // High error correction level
    res.status(200).json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.post("/verify-payment", (req, res) => {
  // Simulate payment verification
  res.status(200).json({ message: "Payment Successful" });
});

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});

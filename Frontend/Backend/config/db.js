import mongoose from "mongoose"; // Add this line

const connectDB = async () => {
  try {
    const res = await mongoose.connect("mongodb+srv://codehackamod:lue1SiZfcRMcWt0H@lms.3ujwt.mongodb.net/");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;

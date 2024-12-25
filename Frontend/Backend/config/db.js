import mongoose from "mongoose"; // Add this line

const connectDB = async () => {
  try {
    // const res = await mongoose.connect("mongodb+srv://amodchaudhari94:PGcuFsuALos6FOmx@lms01.zc9bb.mongodb.net/");
    const res = await mongoose.connect("mongodb+srv://shubhangitijare2000:y7Qt726SDx2yszC8@lmsproject.ij3ma.mongodb.net/");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
 
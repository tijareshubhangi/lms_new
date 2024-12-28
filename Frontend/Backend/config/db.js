import mongoose from "mongoose"; // Add this line

const connectDB = async () => {
  try {
    // const res = await mongoose.connect("mongodb+srv://amodchaudhari94:PGcuFsuALos6FOmx@lms01.zc9bb.mongodb.net/");
    const res = await mongoose.connect("mongodb+srv://noxadstrom110:tYQttlM5yvMpUzp2@new.xfimn.mongodb.net/?retryWrites=true&w=majority&appName=new");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
 
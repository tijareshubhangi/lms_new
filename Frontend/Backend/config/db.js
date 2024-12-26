import mongoose from "mongoose"; // Add this line

const connectDB = async () => {
  try {
    // const res = await mongoose.connect("mongodb+srv://amodchaudhari94:PGcuFsuALos6FOmx@lms01.zc9bb.mongodb.net/");
    const res = await mongoose.connect("mongodb+srv://amodchaudhari11:vUdnFLHOZpLX08wx@clusteramod.dbfvg.mongodb.net/?retryWrites=true&w=majority&appName=Clusteramod");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
 
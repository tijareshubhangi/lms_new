import mongoose from "mongoose";

const connectDB = async () => {
  try {
  
    const res = await mongoose.connect("mongodb://127.0.0.1:27017/mern-auth-project", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;

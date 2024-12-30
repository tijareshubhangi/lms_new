import mongoose from "mongoose"; // Add this line

const connectDB = async () => {
  try {
    const res = await mongoose.connect("mongodb+srv://mrdhumketu04:AuNc5JMvJKydp2h3@server1.q3vkb.mongodb.net/");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;
 
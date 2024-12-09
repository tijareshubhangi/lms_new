import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  images:[
      {
         filename: {
          type: String,
          required: true,
        },
      },
],
firstName: {
  type: String,
  required: true, // Ensure that it is a required field
  default: "",    // Provide a default value to avoid null
},
lastName: {
  type: String,
  required: true,
  default: "",
},
});

// create course 

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  featured: { type: Boolean, default: false },
  media: {
    imageUrl: { type: String },
    videoUrl: { type: String },
  },
  curriculum: { type: [String], default: [] },
  tags: { type: [String] },
  reviewerMessage: { type: String },
});

const Course = mongoose.model('Course', courseSchema)

const authModel = mongoose.model("user", authSchema);
export default authModel;

import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false },
    level: { type: String, required: false },
    featured: { type: Boolean, default: false },
    media: {
      imageUrl: { type: String },
      videoUrl: { type: String },
    },
    curriculum: { type: [String], default: [] },
    tags: { type: [String] },
    reviewerMessage: { type: String },
  });
  
  const Course = mongoose.model('Course', courseSchema);
  export default Course
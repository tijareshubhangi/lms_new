import mongoose from "mongoose";
<<<<<<< HEAD

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  featured: { type: Boolean, default: false },
  media: {
    imageUrl: {
      path: { type: String },
      originalName: { type: String }
    },
    videoUrl: {
      path: { type: String },
      originalName: { type: String }
    }
  },
  curriculum: { type: [String], default: [] },
  tags: { type: [String] },
  reviewerMessage: { type: String },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;

=======
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
>>>>>>> 289ec6f157802e29f2ae8979fd65a007a654068f

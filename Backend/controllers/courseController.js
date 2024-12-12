

class courseController {
    // Add a new course
  static addCourse = async (req, res) => {
    const {
      title,
      description,
      category,
      level,
      featured,
      videoUrl,
      tags,
      reviewerMessage,
      curriculum,
    } = req.body;

    try {
      const newCourse = new Course({
        title,
        description,
        category,
        level,
        featured: featured === 'true', // Convert string to boolean
        media: {
          imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
          videoUrl,
        },
        tags: tags ? tags.split(',') : [],
        reviewerMessage,
        curriculum: curriculum ? JSON.parse(curriculum) : [],
      });

      const savedCourse = await newCourse.save();
      res.status(201).json({ message: 'Course added successfully', course: savedCourse });
    } catch (error) {
      res.status(500).json({ error: 'Error adding course', details: error.message });
    }
  };
  
  // Get all courses
  static getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching courses', details: error.message });
    }
  };
}
export default courseController;
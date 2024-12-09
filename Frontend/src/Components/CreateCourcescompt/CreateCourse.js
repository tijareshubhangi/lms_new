import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav';

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    featured: false,
    videoUrl: '',
    videoFile: null,
    tags: '',
    message: '',
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: checked,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: files[0], // Store the first file selected
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', courseDetails.title);
    formData.append('description', courseDetails.description);
    formData.append('category', courseDetails.category);
    formData.append('level', courseDetails.level);
    formData.append('featured', courseDetails.featured);
    formData.append('videoUrl', courseDetails.videoUrl);
    formData.append('tags', courseDetails.tags);
    formData.append('message', courseDetails.message);
    formData.append('termsAccepted', courseDetails.termsAccepted);

    // Add the video file if provided
    if (courseDetails.videoFile) {
      formData.append('videoFile', courseDetails.videoFile);
    }

    try {
      // Using Axios to send the POST request
      const response = await axios.post('/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Course submitted successfully:', response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting course:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const navigateToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= totalSteps) {
      setCurrentStep(stepNumber);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 style={styles.heading}>Course Details</h2>
            <div style={styles.formGroup}>
              <label htmlFor="title">Course title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseDetails.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="description">Short description</label>
              <textarea
                id="description"
                name="description"
                value={courseDetails.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                style={styles.textarea}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="category">Course category</label>
              <select
                id="category"
                name="category"
                value={courseDetails.category}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Select category</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="it">Information Technology</option>
                <option value="finance">Finance</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="level">Course level</label>
              <select
                id="level"
                name="level"
                value={courseDetails.level}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={courseDetails.featured}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="featured">Mark as featured course</label>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 style={styles.heading}>Course Media</h2>
            <div style={styles.uploadArea}>
              <p>Upload course image</p>
              <input type="file" accept="image/*" name="image" />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="videoUrl">Video URL</label>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={courseDetails.videoUrl}
                onChange={handleInputChange}
                placeholder="Enter video URL"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="videoFile">Or upload video file</label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 style={styles.heading}>Curriculum</h2>
            <button style={styles.button}>Add Lecture</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 style={styles.heading}>Additional Information</h2>
            <div style={styles.formGroup}>
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={courseDetails.tags}
                onChange={handleInputChange}
                placeholder="Enter tags (comma separated)"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="message">Message to reviewer</label>
              <textarea
                id="message"
                name="message"
                value={courseDetails.message}
                onChange={handleInputChange}
                placeholder="Write a message to the reviewer"
                style={styles.textarea}
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={courseDetails.termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms">I accept the terms and conditions</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Nav />
      {/* Your UI and content as per the existing structure */}
      <div style={styles.formContainer}>
        {renderStepContent()}
        <div style={styles.navigationButtons}>
          <button
            onClick={() => navigateToStep(currentStep - 1)}
            disabled={currentStep === 1}
            style={styles.button}
          >
            Previous
          </button>
          {currentStep === totalSteps ? (
            <button onClick={handleSubmit} style={styles.button}>
              Submit Course
            </button>
          ) : (
            <button
              onClick={() => navigateToStep(currentStep + 1)}
              style={styles.button}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCourse;

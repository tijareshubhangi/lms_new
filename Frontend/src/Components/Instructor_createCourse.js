import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

const Instructor_createCourse = () => {
  // State Management
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Course Details
  const [courseTitle, setCourseTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [language, setLanguage] = useState([]);
  const [featuredCourse, setFeaturedCourse] = useState(false);
  const [courseTime, setCourseTime] = useState('');
  const [totalLecture, setTotalLecture] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState('');

  // Step 2: Course Media
  const [courseImage, setCourseImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  // Step 3: Curriculum
  const [lectures, setLectures] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Step 4: Additional Information
  const [tags, setTags] = useState([]);
  const [reviewerMessage, setReviewerMessage] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  // Handlers
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
  };

  const handleLanguageChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setLanguage(selected);
  };

  // Lectures Handlers
  const handleAddLecture = () => {
    setLectures([...lectures, { title: '', topics: [] }]);
  };

  const handleLectureChange = (index, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index].title = value;
    setLectures(updatedLectures);
  };

  const handleAddTopic = (lectureIndex) => {
    const updatedLectures = lectures.map((lecture, index) =>
      index === lectureIndex
        ? { ...lecture, topics: [...lecture.topics, { title: '', videoUrl: '', videoFile: null }] }
        : lecture
    );
    setLectures(updatedLectures);
  };

  const handleTopicChange = (lectureIndex, topicIndex, field, value) => {
    const updatedLectures = lectures.map((lecture, lIndex) => {
      if (lIndex === lectureIndex) {
        const updatedTopics = lecture.topics.map((topic, tIndex) => {
          if (tIndex === topicIndex) {
            return { ...topic, [field]: value };
          }
          return topic;
        });
        return { ...lecture, topics: updatedTopics };
      }
      return lecture;
    });
    setLectures(updatedLectures);
  };

  // FAQs Handlers
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = faqs.map((faq, fIndex) => {
      if (fIndex === index) {
        return { ...faq, [field]: value };
      }
      return faq;
    });
    setFaqs(updatedFaqs);
  };

  // Tags Handlers
  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = e.target.value.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      e.target.value = '';
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, tIndex) => tIndex !== index));
  };

  // Navigation Handlers
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      courseTitle,
      shortDescription,
      courseCategory,
      courseLevel,
      language,
      featuredCourse,
      courseTime,
      totalLecture,
      coursePrice,
      discountPrice: enableDiscount ? discountPrice : null,
      enableDiscount,
      courseDescription,
      courseImage,
      videoUrl,
      videoFile,
      lectures,
      faqs,
      tags,
      reviewerMessage,
    };
    // Call API to create course
    console.log(courseData);
    // Reset form or redirect as needed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <div className="text-blue-600 font-semibold">1</div>
            <span className="text-gray-600 font-medium">Course details</span>
          </div>
          <div className="flex space-x-4">
            <span className="text-gray-500">Course media</span>
            <span className="text-gray-500">Curriculum</span>
            <span className="text-gray-500">Additional information</span>
          </div>
        </div>

        {/* Course Details Form */}
        <form>
          <div className="grid grid-cols-2 gap-6">
            {/* Course Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course title</label>
              <input
                type="text"
                placeholder="Enter course title"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Short Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short description</label>
              <input
                type="text"
                placeholder="Enter short description"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Keywords */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <input
                type="text"
                placeholder="Enter keywords"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Course Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course category</label>
              <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Select category</option>
              </select>
            </div>

            {/* Course Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course level</label>
              <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Select course level</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Select language</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                className="text-blue-600 focus:ring-blue-500 rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Check this for featured course
              </label>
            </div>

            {/* Course Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course time</label>
              <input
                type="text"
                placeholder="Enter course time"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Total Lectures */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total lectures</label>
              <input
                type="text"
                placeholder="Enter total lectures"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Course Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course price</label>
              <input
                type="text"
                placeholder="Enter course price"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount price</label>
              <input
                type="text"
                placeholder="Enter discount price"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Add description"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="5"
              ></textarea>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
            );
        }
export default Instructor_createCourse;


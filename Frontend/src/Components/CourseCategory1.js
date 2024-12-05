import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { Modal, Button } from "react-bootstrap";

const CourseCategory1 = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVideoBlurred, setIsVideoBlurred] = useState(true);

  const navigate = useNavigate();

  // Dummy course data
  const courses = [
    { id: 1, title: "SEO", duration: "10h 56m", lectures: 82, level: "Beginner", videoSrc: "assets/videos/video1.mp4" },
    { id: 2, title: "SMM", duration: "6h 20m", lectures: 60, level: "Intermediate", videoSrc: "assets/videos/video2.mp4" },
    { id: 3, title: "Digital Marketing", duration: "12h 15m", lectures: 100, level: "Advanced", videoSrc: "assets/videos/video3.mp4" },
  ];

  const handleBlurredVideoClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    setCart([...cart, selectedCourse]);
    setShowModal(false);
  };

  const handleProceedToCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCart([]);
    navigate("/");
  };

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const styles = {
    container: {
      padding: '2rem',
    },
    s1: {
      marginBottom: '2rem',
    },
    card: {
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    cardBody: {
      padding: '2rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign:'center',
    },
    row: {
      marginBottom: '1.5rem',
      textAlign:'center',
    },
    rowBorder: {
      border: '1px solid #ddd',
      borderRadius: '8px',
    },
    rowAlignItemsCenter: {
      display: 'flex',
      alignItems: 'center',
    },
    colMd6: {
      flex: '0 0 50%',
      maxWidth: '50%',
    },
    video: {
      borderRadius: '8px',
      marginLeft:'-10px',
      
    },
    sectionTitle: {
      fontSize: '2rem',
      marginBottom: '1.5rem',
    },
    blurredVideo: {
      filter: 'blur(8px)',
    },
    pointer: {
      cursor: 'pointer',
    },
    defaultCursor: {
      cursor: 'default',
    },

    // Media Queries
    '@media (max-width: 767px)': {
      container: {
        padding: '1rem',
      },
      row: {
        flexDirection: 'column',
      },
      colMd6: {
        flex: '0 0 100%',
        maxWidth: '100%',
        marginBottom: '1rem',
      },
      sectionTitle: {
        fontSize: '1.5rem',
      },
      cardBody: {
        display: 'flex',
        flexDirection: 'column-reverse',
      },
    },

    '@media (min-width: 768px) and (max-width: 1023px)': {
      sectionTitle: {
        fontSize: '1.75rem',
      },
      colMd6: {
        flex: '0 0 50%',
        maxWidth: '50%',
        marginBottom: '1rem',
      },
    },

    '@media (min-width: 1024px)': {
      colMd6: {
        flex: '0 0 33.333%',
        maxWidth: '33.333%',
      },
      sectionTitle: {
        fontSize: '2rem',
      },
      cardBody: {
        padding: '2rem',
        display: 'flex',
        flexDirection:' row',
        justifyContent: 'space-between',
      },
    },
  };

  return (
    <div>
      <Nav cartCount={cartCount} handleLogout={handleLogout} />

      {/* Hero Section */}
      <section className="bg-light position-relative mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-md-3 text-center">
              <img src="assets/images/element/cat1.png" alt="Category" />
            </div>
            <div className="col-md-6 text-center">
              <h1 className="mb-3">What do you want to learn?</h1>
              <p className="mb-3">Grow your skill with the most reliable online courses and certifications</p>
              <form className="bg-body rounded p-2">
                <input className="form-control border-0 me-1" type="search" placeholder="Search course" />
                <button type="button" className="btn btn-dark rounded">Search</button>
              </form>
            </div>
            <div className="col-6 col-md-3 text-center">
              <img src="assets/images/element/cat2.png" alt="Category" />
            </div>
          </div>
        </div>
      </section>

      {/* Course Listing Section */}
      <section>
        <div className="container" style={styles.container}>
          <div className="row" style={styles.s1}>
            <div className="col-lg-6">
              <div className="card rounded  overflow-hidden shadow mb-4" style={styles.card}>
                <div className="card-body" style={styles.cardBody}>
                  <Link to="#"><h1 style={styles.sectionTitle}>HTML</h1></Link>
                  {courses.map((course, index) => (
                  
                    <div
                      
                      key={course.id}
                      className="row align-items-center border  overflow-hidden shadow mb-3"
                      style={{
                        ...styles.row,
                        filter: isVideoBlurred && index === 2 ? styles.blurredVideo.filter : 'none',
                        cursor: index === 2 ? styles.pointer.cursor : styles.defaultCursor.cursor,
                      }}
                      onClick={index === 2 ? () => handleBlurredVideoClick(course) : undefined}
                    >
                      <div className="col-md-6" style={styles.colMd6}>
                        <video src={course.videoSrc} controls width="100%" style={styles.video} />
                      </div>
                      <div className="col-md-6" style={styles.colMd6}>
                        <Link to="/productdetals"><h5 className="card-title" style={styles.cardTitle}>{course.title}</h5></Link>
                        <p className="mb-1">Duration: {course.duration}</p>
                        <p className="mb-1">Lectures: {course.lectures}</p>
                        <p>Level: {course.level}</p>
                      </div>
                    </div>
                   
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card rounded overflow-hidden shadow mb-4" style={styles.card}>
                <div className="card-body" style={styles.cardBody}>
                  <h1 style={styles.sectionTitle}>NODE.JS</h1>
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="row border rounded align-items-center mb-3  overflow-hidden shadow"
                      style={{
                        ...styles.row,
                        ...styles.rowBorder,
                        filter: isVideoBlurred && index === 2 ? styles.blurredVideo.filter : 'none',
                        cursor: index === 2 ? styles.pointer.cursor : styles.defaultCursor.cursor,
                      }}
                      onClick={index === 2 ? () => handleBlurredVideoClick(course) : undefined}
                    >
                      <div className="col-md-6" style={styles.colMd6}>
                        <video src={course.videoSrc} controls width="100%" style={styles.video} />
                      </div>
                      <div className="col-md-6" style={styles.colMd6}>
                        <h5 className="card-title" style={styles.cardTitle}>{course.title}</h5>
                        <p className="mb-1">Duration: {course.duration}</p>
                        <p className="mb-1">Lectures: {course.lectures}</p>
                        <p>Level: {course.level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to add this course to the cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default CourseCategory1;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { Modal, Button } from "react-bootstrap";

const CourseCategory1 = ({onAddToCart}) => {
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

  // const handleAddToCart = () => {
  //   setCart([...cart, selectedCourse]);
  //   setShowModal(false);
  // };

  const handleProceedToCart = () => {
    setShowModal(false);
    navigate("/productdetals");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCart([]);
    navigate("/");
  };

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);
  const handleAddToCart = () => {
    if (selectedCourse) {
      setCart((prevCart) => [...prevCart, selectedCourse]); // Add selected course to cart
      onAddToCart(selectedCourse); // Notify parent component (if applicable)
      setShowModal(false); // Close the modal
    } else {
      alert("No course selected to add to cart.");
    }
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
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="card rounded overflow-hidden shadow mb-4">
                <div className="card-body">
                  <h1>HTML</h1>
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="row align-items-center mb-3"
                      style={{
                        filter: isVideoBlurred && index === 2 ? "blur(8px)" : "none",
                        cursor: index === 2 ? "pointer" : "default",
                      }}
                      onClick={index === 2 ? () => handleBlurredVideoClick(course) : undefined}
                    >
                      <div className="col-md-6">
                        <video src={course.videoSrc} controls width="100%" />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{course.title}</h5>
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
              <div className="card rounded overflow-hidden shadow mb-4">
                <div className="card-body">
                  <h1>NODE.JS</h1>
                  {/* Add Node.js content */}
                  {courses.map((course, index) => (
                    <div

                      key={course.id}
                      className="row border rounded align-items-center mb-3 "
                      style={{
                        filter: isVideoBlurred && index === 2 ? "blur(8px)" : "none",
                        cursor: index === 2 ? "pointer" : "default",
                      }}
                      onClick={index === 2 ? () => handleBlurredVideoClick(course) : undefined}
                    >
                      <div className="col-md-6  ">
                        <video src={course.videoSrc} controls width="100%" />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{course.title}</h5>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Duration: {selectedCourse?.duration}</p>
          <p>Lectures: {selectedCourse?.lectures}</p>
          <p>Level: {selectedCourse?.level}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <button
      className="btn btn-primary mt-3"
      onClick={handleAddToCart}
      style={{ cursor: "pointer" }} // Pointer style for the button
    >
      Add to Cart
    </button>
          <Button variant="success" onClick={handleProceedToCart}>
            Product Review
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default CourseCategory1;







// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate instead
// import Nav from './Nav'
// import Footer from './Footer';

// const CourseCategory1 = ({ onAddToCart }) => {
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//       localStorage.removeItem("cart");
//     }
//   }, []); 

//   useEffect(() => {
//     // Update cart count whenever the cart state changes
//     setCartCount(cart.reduce((count, item) => count + item.quantity, 0));
//   }, [cart]);

//   const handleAddToCart = (product) => {
//     const existsInCart = cart.find((item) => item.id === product.id);
//     if (existsInCart) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const handleAdd = (product) => {
//     setCart(
//       cart.map((item) =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleRemove = (product, isDelete = false) => {
//     if (isDelete) {
//       setCart(cart.filter((item) => item.id !== product.id));
//     } else {
//       const updatedCart = cart.map((item) =>
//         item.id === product.id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//       setCart(updatedCart);
//     }
//   };

//   const handleClearCart = () => {
//     setCart([]);
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setCart([]);
//     window.location.reload();
//     navigate("/");
//   };
//   const [products, setProducts] = useState([]);
//   // const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     // Simulate fetching product (course) data
//     setProducts([
//       { id: 1, name: "Computer Hardware", price: 500, image: "assets/images/courses/4by3/HW.png" },
//       { id: 2, name: "Computer Networking", price: 800, image: "assets/images/courses/4by3/NW.png" },
//       { id: 3, name: "AWS Cloud Computing", price: 1200, image: "assets/images/courses/4by3/AWS.png" },
//       { id: 4, name: "Linux", price: 1500, image: "assets/images/courses/4by3/Linux.png" },
//       { id: 5, name: "CCNA", price: 1500, image: "assets/images/courses/4by3/CCNA.png" },
//       { id: 6, name: "MCITP", price: 1500, image: "assets/images/courses/4by3/MCT.png" },
//       { id: 7, name: "MCSE", price: 1500, image: "assets/images/courses/4by3/Linux.png" }
//     ]);
//   }, []);



//   const handleNavigateToCourseList = () => {
//     navigate('/courselist'); // Navigate to course list using navigate
//   };

//   return (
//     <div>
//       <Nav cartCount={cartCount} handleLogout={handleLogout} />
//       <br /><br /><br />
//       <section className="bg-light position-relative">
//         <div className="container position-relative">
//           <div className="row">
//             <div className="col-12">
//               <div className="row align-items-center">
//                 <div className="col-6 col-md-3 text-center order-1">
//                   <img src="assets/images/element/cat1.png" alt="Category" />
//                 </div>
//                 <div className="col-md-6 px-md-5 text-center position-relative order-md-2 mb-5 mb-md-0">
//                   <h1 className="mb-3">What do you want to learn?</h1>
//                   <p className="mb-3">Grow your skill with the most reliable online courses and certifications</p>
//                   <form className="bg-body rounded p-2">
//                     <input className="form-control border-0 me-1" type="search" placeholder="Search course " />
//                     <button type="button" className="btn btn-dark rounded">Search</button>
//                   </form>
//                 </div>
//                 <div className="col-6 col-md-3 text-center order-3">
//                   <img src="assets/images/element/cat2.png" alt="Cat" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Dynamic Course Listing */}
//       <section>
//         <div className="container">
//           <div className="row g-4">
//             {products.map((product) => (
//               <div key={product.id} className="col-sm-6 col-md-4 col-xl-3">
//                 <div className="card card-body text-center position-relative btn-transition p-4">
//                   <div className="col-md-12">
//                     <img 
//                       src={product.image} 
//                       alt={product.name} 
//                       className="img-border" 
//                       style={{ cursor: 'pointer' }} // Set cursor to pointer for image
//                       onClick={handleNavigateToCourseList} // Redirect on image click
//                     />
//                   </div>
//                   <h5 
//                     className="mb-2 mt-3" 
//                     style={{ cursor: 'pointer' }} // Set cursor to pointer for heading
//                     onClick={handleNavigateToCourseList} // Redirect on heading click
//                   >
//                     {product.name}
//                   </h5>
//                   <h6 className="mb-0">Price: ₹{product.price}</h6>
//                   <button 
//                     className="btn btn-primary mt-3" 
//                     onClick={() => handleAddToCart(product)}
//                     style={{ cursor: 'pointer' }} // Set cursor to pointer for button
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer/>
//     </div>
//   );
// };

// export default CourseCategory1;
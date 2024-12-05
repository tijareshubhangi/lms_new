import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Ribbon Style
const ribbonStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
    overflow: "hidden",
    width: "75px",
    height: "75px",
};

const ribbonSpanStyle = {
    position: "absolute",
    display: "block",
    width: "105px",
    padding: "5px 0",
    backgroundColor: "#5cb85c",
    color: "#fff",
    textAlign: "center",
    transform: "rotate(-45deg)",
    top: "19px",
    left: "-21px",
};

// Currency formatting
const formatPrice = (price) => {
    return price === 0 ? "Free" : `₹${price.toLocaleString()}`;
};

const CourseCard = ({ course }) => (
    <div className="card action-trigger-hover border bg-transparent mx-2" style={{ width: "100%" }}>
        <img src={course.image} className="card-img-top" alt="course" />
        {course.isFree && (
            <div className="ribbon mt-3" style={ribbonStyle}>
                <span style={ribbonSpanStyle}>Free</span>
            </div>
        )}
        <div className="card-body pb-0">
            <div className="d-flex justify-content-between mb-3">
                <span className="hstack gap-2">
                    <Link to="#" className="badge bg-primary bg-opacity-10 text-primary">
                        {course.category}
                    </Link>
                    <Link to="#" className="badge text-bg-dark">{course.level}</Link>
                </span>
                <Link to="#" className="h6 fw-light mb-0">
                    <i className="far fa-bookmark"></i>
                </Link>
            </div>
            <h5 className="card-title"><Link to="#">{course.title}</Link></h5>
            <div className="d-flex justify-content-between mb-2">
                <div className="hstack gap-2">
                    <p className="text-warning m-0">
                        {course.rating}<i className="fas fa-star text-warning ms-1"></i>
                    </p>
                    <span className="small">({course.reviews})</span>
                </div>
                <div className="hstack gap-2">
                    <p className="h6 fw-light mb-0 m-0">{course.students}</p>
                    <span className="small">(Students)</span>
                </div>
            </div>
            <div className="hstack gap-3">
                <span className="h6 fw-light mb-0">
                    <i className="far fa-clock text-danger me-2"></i>{course.duration}
                </span>
                <span className="h6 fw-light mb-0">
                    <i className="fas fa-table text-orange me-2"></i>{course.lectures} lectures
                </span>
            </div>
        </div>
        <div className="card-footer pt-0 bg-transparent">
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-sm">
                        <img className="avatar-img rounded-1" src={course.instructor.image} alt="instructor" />
                    </div>
                    <p className="mb-0 ms-2">
                        <Link to="#" className="h6 fw-light mb-0">{course.instructor.name}</Link>
                    </p>
                </div>
                <div>
                    <h4 className="text-success mb-0 item-show">{formatPrice(course.price)}</h4>
                </div>
            </div>
        </div>
    </div>
);

const TrendingCourses = () => {
    const courses = [
        {
            image: "assets/images/courses/4by3/14.jpg",
            title: "The Complete Digital Marketing Course - 8 Courses in 1",
            category: "Design",
            level: "Beginner",
            rating: 4.5,
            reviews: 6500,
            students: 6500,
            duration: "6h 56m",
            lectures: 82,
            instructor: { name: "Larry Lawson", image: "assets/images/avatar/10.jpg" },
            isFree: true,
            price: 0,
        },
        {
            image: "assets/images/courses/4by3/15.jpg",
            title: "Angular – The Complete Guide (2021 Edition)",
            category: "Development",
            level: "All level",
            rating: 4.0,
            reviews: 3500,
            students: 4500,
            duration: "12h 45m",
            lectures: 65,
            instructor: { name: "Billy Vasquez", image: "assets/images/avatar/04.jpg" },
            isFree: false,
            price: 255,
        },
        {
            image: "assets/images/courses/4by3/16.jpg",
            title: "React – Master React Framework with Projects",
            category: "Development",
            level: "Intermediate",
            rating: 4.7,
            reviews: 2000,
            students: 3000,
            duration: "8h 30m",
            lectures: 90,
            instructor: { name: "John Smith", image: "assets/images/avatar/05.jpg" },
            isFree: false,
            price: 199,
        },
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: (
            <button className="slick-prev" style={{ position: 'absolute', left: '10px', top: '50%', zIndex: 2, background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="fas fa-chevron-left"></i>
            </button>
        ),
        nextArrow: (
            <button className="slick-next" style={{ position: 'absolute', right: '10px', top: '50%', zIndex: 2, background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="fas fa-chevron-right"></i>
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="pb-5" style={{ padding: '40px 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fs-1">Our Trending Courses</h2>
                    <p>Explore the top courses trending in the market.</p>
                </div>
                <Slider {...sliderSettings}>
                    {courses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default TrendingCourses;

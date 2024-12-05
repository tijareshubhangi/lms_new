import React, { useState, useEffect } from "react";
import axios from "../Components/Services/axiosInterceptor";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Cart = ({ cart, onAdd, onRemove, onClearCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, [cart]);


  const handleLogin = async (email, password) => {
  try {
    const res = await axios.post("/api/auth/login", { email, password });
    
    if (res.status === 200) {
      // Store the token and email in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email); // Store the new email
      
      // Redirect to home or other page
      navigate("/home");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred while logging in.");
  }
};


const handleBuy = async () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage

  if (!token) {
    alert("Please log in or sign up to complete your purchase.");
    navigate("/signin");
    return; // Stop execution if not logged in
  }

  if (!email) {
    alert("User email not found. Please log in again.");
    return; // Stop if email is not available
  }

  try {
    // Send email request
    const res = await axios.post("/api/auth/send-email", { email });
    
    if (res.status === 200) {
      alert("Purchase successful! Confirmation email sent.");
      onClearCart(); // Clear cart after successful purchase
    } else {
      alert("Purchase successful, but email could not be sent.");
    }
  } catch (error) {
    console.error("Error sending email:", error); // Log detailed error for debugging
    alert(
      `An error occurred while sending the confirmation email. ${
        error.response?.data?.message || "Please try again later."
      }`
    );
  }
};             

  return (
    
    <>
    <Nav/>
    <div>
      <section className="py-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-light p-4 text-center rounded-3">
                <h1 className="m-0">My Cart</h1>
                <div className="d-flex justify-content-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-dots mb-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/courses">Courses</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Cart
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <section className="pt-5">
          <div className="container">
            <div className="row g-4 g-sm-5">
              <div className="col-lg-8 mb-4 mb-sm-0">
                <div className="card card-body p-4 shadow">
                  <div
                    className="alert alert-danger alert-dismissible d-flex justify-content-between align-items-center fade show py-3 pe-2"
                    role="alert"
                  >
                    <div>
                      <span className="fs-5 me-1">🔥</span>
                      These courses are at a limited discount, please checkout
                      within
                      <strong className="text-danger ms-1">
                        2 days and 18 hours
                      </strong>
                    </div>
                    <button
                      type="button"
                      className="btn btn-link mb-0 text-primary-hover text-end"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <div>
                      <p>Your cart is empty</p>
                      <button onClick={() => navigate("/course")}>
                        Add More Products
                      </button>
                    </div>
                  ) : (
                    <div className="table-responsive border-0 rounded-3">
                      <table className="table align-middle p-4 mb-0">
                        <tbody className="border-top-0">
                          {cart.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="d-lg-flex align-items-center">
                                  <div className="w-100px w-md-80px mb-2 mb-md-0">
                                    {/* <img src={assets/images/courses/${item.id}.jpg} className="rounded" alt={item.name} /> */}
                                  </div>
                                  <h6 className="mb-0 ms-lg-3 mt-2 mt-lg-0">
                                    {item.name}
                                  </h6>
                                </div>
                              </td>
                              <td className="text-center">
                                <h5 className="text-success mb-0">
                                  ₹{item.price}
                                </h5>
                                <p>Quantity: {item.quantity}</p>
                              </td>
                              <td>
                                <button
                                  onClick={() => onAdd(item)}
                                  className="btn btn-sm btn-success-soft px-2 me-1 mb-1 mb-md-0"
                                >
                                  <i className="fas fa-plus" />
                                </button>
                                <button
                                  onClick={() => onRemove(item)}
                                  className="btn btn-sm btn-warning-soft px-2 me-1 mb-1 mb-md-0"
                                >
                                  <i className="fas fa-minus" />
                                </button>
                                <button
                                  onClick={() => onRemove(item, true)}
                                  className="btn btn-sm btn-danger-soft px-2 mb-0"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="row g-3 mt-2">
                        <div className="col-md-6">
                          <input
                            className="form-control"
                            placeholder="COUPON CODE"
                          />
                          <button
                            type="button"
                            className="btn btn-primary mt-2"
                          >
                            Apply coupon
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card card-body p-4 shadow">
                  <h4 className="mb-3">Cart Total</h4>
                  <ul className="list-group list-group-borderless mb-2">
                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="h6 fw-light mb-0">Original Price</span>
                      <span className="h6 fw-light mb-0 fw-bold">
                        ₹{totalPrice}
                      </span>
                    </li>
                  </ul>

                  <div className="d-grid">
                    <button onClick={() => navigate("/")}>
                      See More Products
                    </button>
                    <button
                      onClick={handleBuy}
                      className="btn btn-lg btn-success"
                    >
                      Buy Now
                    </button>
                  </div>

                  <p className="small mb-0 mt-2 text-center">
                    By completing your purchase, you agree to these{" "}
                    <Link to="#">Terms of Service</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Cart;

// File: src/components/Cart.js
import React, { useState, useEffect } from "react";
import axios from "../Components/Services/axiosInterceptor";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Cart = ({ cart, onAdd, onRemove, onClearCart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCartCount(cart.reduce((count, item) => count + item.quantity, 0));
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      alert("Please log in or sign up to complete your purchase.");
      navigate("/signin");
      return;
    }

    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/send-email", { email });

      if (res.status === 200) {
        alert("Purchase successful! Confirmation email sent.");
        onClearCart();
      } else {
        alert("Purchase successful, but email could not be sent.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        `An error occurred while sending the confirmation email. ${
          error.response?.data?.message || "Please try again later."
        }`
      );
    }
  };

  const handleAdd = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemove = (product, isDelete = false) => {
    if (isDelete) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCart([]);
    localStorage.removeItem("cart");
    window.location.reload();
    navigate("/");
  };

  const styles = {
    mainheader: {
      marginTop: '150px',
    },
    '@media (max-width: 1024px)': { // For tablets
      mainheader: {
        marginTop: '100px',
      },
    },
    '@media (max-width: 768px)': { // For small tablets and large phones
      mainheader: {
        marginTop: '80px',
      },
    },
    '@media (max-width: 480px)': { // For mobile devices
      mainheader: {
        marginTop: '50px',
      },
    },
  };
  

  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

      <Nav cartCount={cartCount} handleLogout={handleLogout} />
      <div>
        <section className="py-0 " style={styles.mainheader}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="bg-lights p-4 text-center rounded-3">
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

        <section className="pt-5">
          <div className="container">
            <div className="row g-4 g-sm-5">
              <div className="col-lg-8 mb-4 mb-sm-0">
                <div className="card card-body p-4 shadow">
                  {cart.length === 0 ? (
                    <div>
                      <div
                        className="alert alert-danger alert-dismissible d-flex justify-content-between align-items-center fade show py-3 pe-2"
                        role="alert"
                      >
                        <div>
                          <span className="fs-5 me-1">🔥</span>
                          <strong className="text-danger ms-1">
                          Your cart is empty ! add cources
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

                     
                      <button
                        onClick={() => navigate("/course")}
                        className="btn btn-lg btn-success"
                      >
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
                                <img
            src={item.thumbnail}
            alt={item.name}
            className="img-fluid rounded"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
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
                                  onClick={() => handleAdd(item)}
                                  className="btn btn-sm btn-success-soft px-2 me-1 mb-1 mb-md-0"
                                >
                                  <i className="fas fa-plus" />
                                </button>
                                <button
                                  onClick={() => handleRemove(item)}
                                  className="btn btn-sm btn-warning-soft px-2 me-1 mb-1 mb-md-0"
                                >
                                  <i className="fas fa-minus" />
                                </button>
                                <button
                                  onClick={() => handleRemove(item, true)}
                                  className="btn btn-sm btn-danger-soft px-2 mb-0"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        className="btn btn-danger mt-3"
                        onClick={handleClearCart}
                      >
                        Clear Cart
                      </button>
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
                        // onClick={handleBuy}
                        onClick={() => navigate("/payment")}
                        className="btn btn-lg btn-success"
                      >
                        Continue Purchase
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
      <Footer />
    </>
  );
};

export default Cart;
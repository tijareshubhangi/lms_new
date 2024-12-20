import React from "react";
import { auth, googleProvider, signInWithPopup } from "../../services/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const GoogleLogin = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send user data to backend
<<<<<<< HEAD
      const res = await axios.post("http://localhost:9000/api/users/save", {
=======
      const res = await axios.post("http://localhost:3000/api/users/save", {
>>>>>>> 9d7e2ccd295637e5695a0cc760e4f1ecf13b836c
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      console.log("User saved to backend:", res.data);
      navigate("/success"); // Replace "/dashboard" with your desired route
    } catch (error) {    
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} style={{ padding: "10px 20px" }}>
      Login with Google
    </button>
  );
};

export default GoogleLogin;

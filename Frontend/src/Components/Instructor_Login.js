
import React, { useState, useEffect } from 'react';  // Import React and useState
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
>>>>>>> person2

const Instructor_Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    let countdown;
    if (timer > 0 && isOtpSent) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer, isOtpSent]);

  // Function to send OTP
  const sendOtp = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email });
      setMessage(response.data.message);
      setIsOtpSent(true);
      setTimer(60); // Start countdown
    } catch (error) {
      setMessage('Error sending OTP');
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, userOtp: otp });
      setMessage(response.data.message);
      if (response.data.message === 'OTP verified successfully') {
        alert('OTP verified successfully');
        navigate('/instructordashboard'); // Redirect to instructor dashboard
      }
    } catch (error) {
      setMessage('Invalid OTP');
    }
  };

  const handleSubmit = (e) => {  // Now React.FormEvent is recognized
    e.preventDefault();
    console.log('Form submitted with email:', email);
  };

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div className="login-form-container">
      <div className="form-wrapper">
        <div className="logo-container">
          <img src="assets/images/LMS.png" alt="LMS" className="logo" />
        </div>
        <div className="form-card">
        <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp} disabled={isOtpSent}>Send OTP</button>

      {isOtpSent && (
        <>
          <p>OTP expires in: {timer}s</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {/* {canResend && !isOtpSent && (
        <button onClick={sendOtp}>Resend OTP</button>
      )} */}

      <p>{message}</p>
          <p className="terms-text">
            By continuing, you agree to LMS's{' '}
            <Link href="#" className="terms-Link">Conditions of Use</Link> and{' '}
            <Link href="#" className="terms-Link">Privacy Notice</Link>.
          </p>
          <Link href="#" className="help-Link">Need help?</Link>
        </div>
        <div className="divider">
          <span className="divider-text">New to LMS?</span>
        </div>
        <button className="create-account-button" onClick={() => window.location.href = '/signUp'}>
             Create your Instructor account
       </button>
      </div>
      <footer className="footer">
        <div className="footer-Links">
          <Link href="#" className="footer-Link">Conditions of Use</Link>
          <Link href="#" className="footer-Link">Privacy Notice</Link>
          <Link href="#" className="footer-Link">Help</Link>
        </div>
        <div className="footer-text">© 1996-2024, Amazon.com, Inc. or its affiliates</div>
      </footer>
    </div>
    </>
  );
};

export default Instructor_Login;


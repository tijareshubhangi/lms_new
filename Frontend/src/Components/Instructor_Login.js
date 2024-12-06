import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        navigate('/admin-dashboard'); // Redirect to instructor dashboard
      }
    } catch (error) {
      setMessage('Invalid OTP');
    }
  };
  return (
    <div className="login-form-container">
      <div className="form-wrapper">
        <div className="logo-container">
          <img src="assets/images/LMS.png" alt="LMS" />
        </div>
        <div className="form-card">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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


          <p>{message}</p>
          <p className="terms-text">
            By continuing, you agree to LMS's{' '}
            <a href="#" className="terms-link">Conditions of Use</a> and{' '}
            <a href="#" className="terms-link">Privacy Notice</a>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Instructor_Login;

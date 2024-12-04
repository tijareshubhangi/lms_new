
import React, { useState } from 'react';  // Import React and useState
import { Link } from 'react-router-dom';

const Instructor_Login = () => {
  const [email, setEmail] = useState('');

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
          <h1 className="form-title">Instructor Login</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email or mobile phone number</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <Link to="/signUp">
              <button type="submit" className="submit-button">
                  Continue
              </button>
           </Link>
          </form>
          <p className="terms-text">
            By continuing, you agree to LMS's{' '}
            <LInk href="#" className="terms-link">Conditions of Use</LInk> and{' '}
            <LInk href="#" className="terms-link">Privacy Notice</LInk>.
          </p>
          <LInk href="#" className="help-link">Need help?</LInk>
        </div>
        <div className="divider">
          <span className="divider-text">New to LMS?</span>
        </div>
        <button className="create-account-button" onClick={() => window.location.href = '/signUp'}>
             Create your Instructor account
       </button>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <LInk href="#" className="footer-link">Conditions of Use</LInk>
          <LInk href="#" className="footer-link">Privacy Notice</LInk>
          <LInk href="#" className="footer-link">Help</LInk>
        </div>
        <div className="footer-text">© 1996-2024, Amazon.com, Inc. or its affiliates</div>
      </footer>
    </div>
    </>
  );
};

export default Instructor_Login;


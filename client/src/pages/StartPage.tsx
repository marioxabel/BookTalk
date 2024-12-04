import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SignUpForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import Auth from '../utils/auth';
import './StartPage.css'

const StartPage = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
    const navigate = useNavigate(); 
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/searchbooks")
      }
    }, [isLoggedIn, navigate]);
  
    return (
        <div className="startpage">
          <h1>Hi there! ready to read some books?</h1>
          
          {/* Login Button */}
          <button 
            type="button" 
            className="btn btn-outline-dark" 
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>

          {/* Signup Button */}
          <button 
            type="button" 
            className="btn btn-outline-dark" 
            onClick={() => setShowSignupModal(true)}
          >
            Sign Up
          </button>

          {/* Login Modal */}
          <Modal
            size='lg'
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            aria-labelledby='login-modal'
          >
            <Modal.Header closeButton>
              <Modal.Title id='login-modal'>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LoginForm handleModalClose={() => {
                setShowLoginModal(false);
                setIsLoggedIn(Auth.loggedIn()); // Update login status
              }} />
            </Modal.Body>
          </Modal>

          {/* Signup Modal */}
          <Modal
            size='lg'
            show={showSignupModal}
            onHide={() => setShowSignupModal(false)}
            aria-labelledby='signup-modal'
          >
            <Modal.Header closeButton>
              <Modal.Title id='signup-modal'>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignUpForm handleModalClose={() => {
                setShowSignupModal(false);
                setIsLoggedIn(Auth.loggedIn()); // Update login status
              }} />
            </Modal.Body>
          </Modal>
        </div>
    );
  };
  
  export default StartPage;

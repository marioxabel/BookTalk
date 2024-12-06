import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import './navbar.css';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
  const location = useLocation();

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Auth.loggedIn());
    };

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const isLandingPage = location.pathname === '/';

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">
            BookTalk
          </Navbar.Brand>
          {!isLandingPage && isLoggedIn && (
            <>
              <Navbar.Toggle aria-controls="navbar" />
              <Navbar.Collapse id="navbar" role="navigation">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/" className="nav-item">
                    SEARCH
                  </Nav.Link>
                  <Nav.Link as={Link} to="/saved" className="nav-item">
                    MY BOOKS
                  </Nav.Link>

                  {isLoggedIn ? (
                    <Nav.Link onClick={handleLogout} className="nav-item">
                      LOGOUT
                    </Nav.Link>
                  ) : (
                    <Nav.Link onClick={() => setShowModal(true)} className="nav-item">
                      Login/Sign Up
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm
                  handleModalClose={() => {
                    setShowModal(false);
                    setIsLoggedIn(Auth.loggedIn());
                  }}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm
                  handleModalClose={() => {
                    setShowModal(false);
                    setIsLoggedIn(Auth.loggedIn());
                  }}
                />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-img.png'; // Correct path to the logo
import './DashboardNavbar.css'

const DashboardNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Logout function
    const handleLogout = () => {
        // Clear user token and other session-related data
        localStorage.removeItem('token'); // Assuming you're storing JWT token in localStorage

        // Redirect to the login page
        navigate('/login');
    };

    // Handle back navigation after logout
    useEffect(() => {
        window.onpopstate = function (event) {
            if (!localStorage.getItem('token')) {
                navigate('/login'); // Redirect to login if token doesn't exist
            }
        };
    }, [navigate]);

    // Function to check if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggler"
                    aria-controls="navbarToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand" to="/dashboard">
                    <img
                        className="d-inline-block align-text-top logo-img"
                        src={logo}
                        alt="TarotScope Logo"
                    // width="350px"
                    // height="30px"
                    // style={{ marginTop: '3px' }}
                    />
                </Link>

                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/dashboard') ? 'active fw-bold' : ''}`}
                                to="/dashboard"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/AskQuestion') ? 'active fw-bold' : ''}`}
                                to="/AskQuestion"
                            >
                                Ask a Question
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/TarotGuide') ? 'active fw-bold' : ''}`}
                                to="/TarotGuide"
                            >
                                Tarot Guide
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/History') ? 'active fw-bold' : ''}`}
                                to="/History"
                            >
                                Past Readings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/ReadingInsights') ? 'active fw-bold' : ''}`}
                                to="/ReadingInsights"
                            >
                                Reading Insights
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-profile ms-3 d-flex align-items-center">
                        {/* Profile image */}
                        <Link 
                            to="/Profile" 
                            className={isActive('/Profile') ? 'active' : ''}
                        >
                            <img
                                src="https://img.icons8.com/?size=100&id=423kipnPTZJn&format=png&color=000000"
                                alt="User Profile"
                                className="user-profile-image rounded-circle"
                                width="40"
                                height="40"
                            />
                        </Link>

                        {/* Logout button */}
                        <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;

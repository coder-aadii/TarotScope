import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import logo from '../../assets/images/logo-img.png'; // Correct path to the logo
import './DashboardNavbar.css'

const DashboardNavbar = () => {
    const navigate = useNavigate();

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

                <a className="navbar-brand" href="/dashboard">
                    <img
                        className="d-inline-block align-text-top logo-img"
                        src={logo}
                        alt="TarotScope Logo"
                    // width="350px"
                    // height="30px"
                    // style={{ marginTop: '3px' }}
                    />
                </a>

                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AskQuestion">Ask a Question</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/TarotGuide">Tarot Guide</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/History">Past Readings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ReadingInsights">Reading Insights</a>
                        </li>
                    </ul>

                    <div className="navbar-profile ms-3 d-flex align-items-center">
                        {/* Profile image */}
                        <Link to="/Profile">
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

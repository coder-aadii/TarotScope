import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../assets/images/logo-img.png'; // Correct path to the logo

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        src={logo}
                        alt="TarotScope Logo"
                        width="200"
                        height="18"
                        style={{ marginTop: '3px' }}
                        className="d-inline-block align-text-top"
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

                    <div className="navbar-profile ms-3">
                        {/* Wrap the profile image inside a Link to redirect to Profile */}
                        <Link to="/Profile">
                            <img
                                src="https://img.icons8.com/?size=100&id=423kipnPTZJn&format=png&color=000000"
                                alt="User Profile"
                                className="user-profile-image rounded-circle"
                                width="40"
                                height="40"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

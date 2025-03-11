import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="mystical-overlay"></div>
            <div className="not-found-content">
                <div className="crystal-ball">
                    <h1>404</h1>
                </div>
                <h2>The Path is Clouded</h2>
                <p>The cards whisper of a journey astray. Let the mystical forces guide you back to your path.</p>
                <div className="tarot-cards">
                    <div className="card card1">
                        <div className="card-back"></div>
                    </div>
                    <div className="card card2">
                        <div className="card-back"></div>
                    </div>
                    <div className="card card3">
                        <div className="card-back"></div>
                    </div>
                </div>
                <Link to="/" className="home-button">
                    Return to Your Journey
                </Link>
            </div>
            <div className="mystical-stars"></div>
        </div>
    );
};

export default NotFound; 
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div>
            {/* About Section */}
            <div className="about">
                <a className="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank" rel="noreferrer">
                    <span className="icon"></span>
                </a>
                <a className="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank" rel="noreferrer">
                    <span className="icon"></span>
                </a>
                <a className="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank" rel="noreferrer">
                    <span className="icon"></span>
                </a>
                <a className="bg_links logo"></a>
            </div>

            {/* Navigation Bar */}
            <nav className="mainNav">
                <div className="mainNav__logo">
                    <Link to="/">
                        <img src={require('../assets/images/logo-img.png')} alt="Logo" className="logo-image" />
                    </Link>
                </div>
                <div className="mainNav__links">
                    <a href="#about" className="mainNav__link">About</a>
                    <a href="#projects" className="mainNav__link">Projects</a>
                    <a href="#team" className="mainNav__link">Team</a>
                    <a href="#contacts" className="mainNav__link">Contacts</a>
                </div>
                <div className="mainNav__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g data-name="Layer 2" fill="#9197AE">
                            <g data-name="menu-2">
                                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                                <circle cx="4" cy="12" r="1" />
                                <rect x="7" y="11" width="14" height="2" rx=".94" ry=".94" />
                                <rect x="3" y="16" width="18" height="2" rx=".94" ry=".94" />
                                <rect x="3" y="6" width="18" height="2" rx=".94" ry=".94" />
                            </g>
                        </g>
                    </svg>
                </div>
            </nav>

            {/* Main Heading */}
            <header className="mainHeading">
                <div className="mainHeading__content">
                    <article className="mainHeading__text">
                        <p className="mainHeading__preTitle">Discover Your Path</p>
                        <h2 className="mainHeading__title">Unveil Your Future with TarotScope</h2>
                        <p className="mainHeading__description">
                            Unlock the mysteries of the universe and gain deeper insights into your life.
                            TarotScope offers intuitive tarot readings to guide you through life’s challenges.
                        </p>
                        <button className="cta">Explore Tarot</button>
                    </article>
                    
                    <figure className="mainHeading__image">
                        <img
                            src="https://res.cloudinary.com/deoegf9on/image/upload/v1739031395/hero-bg-right_c3mhta.jpg"
                            alt="Tarot Card"
                        />
                    </figure>
                </div>
            </header>
        </div>
    );
};

export default Home;

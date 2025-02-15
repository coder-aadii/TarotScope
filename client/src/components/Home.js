import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="mainNav">
                <div className="mainNav__logo">
                    <Link to="/">
                        <img src={require('../assets/images/logo-img.png')} alt="Logo" className="logo-image" />
                    </Link>
                </div>
                <div className="mainNav__links">
                    <a href="/" className="mainNav__link">Home</a>
                    <a href="#about" className="mainNav__link">About</a>
                    {/* <a href="/TarotReading" className="mainNav__link">Tarot Reading</a> */}
                    {/* <a href="/History" className="mainNav__link">History</a> */}
                    <a href="/Contact" className="mainNav__link">Contact</a>
                    <a href="/Login" className="mainNav__link">Login</a>
                    {/* <a href="/Register" className="mainNav__link">Register</a> */}
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

                        <a href="/Login">
                            <button className="button">
                                Explore It
                            </button>
                        </a>

                    </article>

                    <figure className="mainHeading__image">
                        <img
                            src="https://res.cloudinary.com/deoegf9on/image/upload/v1739031395/hero-bg-right_c3mhta.jpg"
                            alt="Tarot Card"
                        />
                    </figure>
                </div>
            </header >

            {/* About Section */}
            <div div className="about" id="about" >
                <h2>About TarotScope</h2>

                {/* Sliding Background Images */}
                <div className="about__background">
                    {/* <div className="about__slide">
                        <img src="https://res.cloudinary.com/deoegf9on/image/upload/v1739414949/tarot-bg2_cymqvg.jpg" alt="Tarot Background 1" />
                    </div>
                    <div className="about__slide">
                        <img src="https://res.cloudinary.com/deoegf9on/image/upload/v1739414950/tarot-bg1_kf22oz.webp" alt="Tarot Background 2" />
                    </div> */}
                    <div className="about__slide">
                        <img src="https://res.cloudinary.com/deoegf9on/image/upload/v1739418106/tarot-bg1_upscaled_slobqu.png" alt="Tarot Background 3" />
                    </div>
                </div>

                <div className="about__details">
                    <div className="para1">
                        <p>
                            At TarotScope, we believe that everyone deserves clarity and insight into their life's journey. Our platform uses intuitive tarot readings to help you discover your true path.
                            Whether you're seeking guidance on love, career, or personal growth, TarotScope is here to guide you with wisdom from the ancient tarot cards.
                        </p>
                    </div>
                    <section className="para2">
                        <p>
                            Our unique tarot spreads, including the popular <strong>Three-Card Spread</strong>, are designed to give you actionable insights. Currently, the Three-Card Spread is available, offering a quick overview of a situation by representing the past, present, and future. Our readings offer both upright and reversed card interpretations to provide clarity in every aspect of life.
                        </p>
                        <div className="para3">
                            <h3>Coming Soon!!!</h3>
                            <ul>
                                <li><strong>Celtic Cross Spread:</strong> A comprehensive 10-card spread that provides insights into a specific question or situation, covering aspects like the present, challenges, past influences, and future outcomes. </li>

                                <li><strong>Seven-Card Horseshoe Spread:</strong> A seven-card spread that provides insights into the past, present, hidden influences, the querent, attitudes of others, advice, and the likely outcome. </li>

                                <li><strong>Romany Spread:</strong> A flexible spread that can be used for general overviews or interconnected issues, allowing for intuitive interpretations. </li>

                                <li><strong>Path Spread:</strong> A spread that compares current actions with suggested behaviors to achieve a desired outcome, focusing on rational, emotional, and external stances.</li>
                            </ul>
                        </div>
                        <p>
                            Explore your past, present, and future in a way that’s meaningful and transformative. Discover more about our story and how TarotScope can help you unlock the mysteries of your life by visiting our About Us page!
                        </p>
                    </section>
                    {/* Know More Button */}
                    <div className="about__button">
                        <Link to="/about">
                            <button className="button know-more">Know More!</button>
                        </Link>
                    </div>

                    {/* About Image */}
                    {/* <div className="about__image">
                        <img src="https://res.cloudinary.com/deoegf9on/image/upload/v1739414949/tarot-bg2_cymqvg.jpg" alt="About TarotScope" />
                    </div> */}
                </div>
            </div >

            {/* Campaigns Section */}
            <section section className="campaigns" id="campaigns" >
                <div className="container">
                    {/* First Row of Campaigns */}
                    <div className="campaigns-wrapper">
                        <div className="campaign-item">
                            <h3 className="campaign-title">
                                Unlock Your Future <br />
                                Through Tarot <br />
                                Discover
                            </h3>
                            <p className="campaign-desc">
                                Explore tarot readings that help reveal the guidance you need to navigate life’s challenges.
                            </p>
                            <a href="/" className="btn btn-primary">
                                View All
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <div className="campaign-item">
                            <h3 className="campaign-title">
                                Tarot Insights <br />
                                for Love & <br />
                                Relationships
                            </h3>
                            <p className="campaign-desc">
                                Understand your love life and find clarity with our specialized relationship tarot spreads.
                            </p>
                            <a href="/" className="btn btn-primary">
                                View All
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>

                    {/* Second Row of Campaigns */}
                    <div className="campaigns-wrapper">
                        <div className="campaign-item">
                            <h3 className="campaign-title">
                                Career Path <br />
                                Tarot Readings <br />
                                Success
                            </h3>
                            <p className="campaign-desc">
                                Gain career insights and discover the opportunities awaiting you through tarot.
                            </p>
                            <a href="/" className="btn btn-primary">
                                View All
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <div className="campaign-item">
                            <h3 className="campaign-title">
                                New Year <br />
                                Tarot Readings <br />
                                New Beginnings
                            </h3>
                            <p className="campaign-desc">
                                Start the year with a fresh perspective through a New Year tarot reading.
                            </p>
                            <a href="/" className="btn btn-primary">
                                View All
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </div >
    );
};

export default Home;

import React from "react";
import "../styles/footer.css";

const Footer = () => {
    return (
        <footer
            className="text-center text-lg-start text-white"
            style={{ backgroundColor: "#1c2331", marginTop: '30px' }}
        >
            {/* Section: Social media */}
            <section
                className="d-flex justify-content-between p-4"
                style={{ backgroundColor: "#6351ce" }}
            >
                {/* Left */}
                <div className="me-5">
                    <span>Get connected with TarotScope on social networks:</span>
                </div>
                {/* Left */}

                {/* Right */}
                <div>
                    <a href="mailto:adityaaerpule@gmail.com" className="text-white me-4" target="_blank" rel="noreferrer">
                        <i className="fas fa-envelope"></i>
                    </a>
                    <a href="https://x.com/aadi_insane_" className="text-white me-4" target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/cod3r.aadi?igsh=MWd1aWNlY3JydXJ4" className="text-white me-4" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/aditya-aerpule-a22062309/" className="text-white me-4" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/coder-aadii" className="text-white me-4" target="_blank" rel="noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                {/* Right */}
            </section>
            {/* Section: Social media */}

            {/* Section: Links  */}
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    {/* Grid row */}
                    <div className="row mt-3">
                        {/* Grid column */}
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            {/* Content */}
                            <h6 className="text-uppercase fw-bold">TarotScope</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#7c4dff",
                                    height: "2px",
                                }}
                            />
                            <p>
                                TarotScope offers insightful tarot readings. Explore the mysteries of tarot cards and unlock guidance for your life's journey.
                            </p>
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            {/* Links */}
                            <h6 className="text-uppercase fw-bold">Services</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#7c4dff",
                                    height: "2px",
                                }}
                            />
                            <p>
                                <a href="#!" className="text-white">
                                    Three-Card Spread
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">
                                    Past, Present, Future
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">
                                    Celtic Cross
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">
                                    Daily Reading
                                </a>
                            </p>
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            {/* Links */}
                            <h6 className="text-uppercase fw-bold">Useful links</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#7c4dff",
                                    height: "2px",
                                }}
                            />
                            <p>
                                <a href="#!" className="text-white">
                                    Your Account
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">
                                    Tarot Reading FAQs
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">
                                    Privacy Policy
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">
                                    Contact Support
                                </a>
                            </p>
                        </div>
                        {/* Grid column */}

                        {/* Grid column */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            {/* Links */}
                            <h6 className="text-uppercase fw-bold">Contact</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{
                                    width: "60px",
                                    backgroundColor: "#7c4dff",
                                    height: "2px",
                                }}
                            />
                            <p>
                                <i className="fas fa-home mr-3"></i> Ujjain, Madhya Pradesh, IN
                            </p>
                            <p>
                                <i className="fas fa-envelope mr-3"></i> support@tarotscope.com
                            </p>
                            <p>
                                <i className="fas fa-phone mr-3"></i> +91 98765 43210
                            </p>
                        </div>
                        {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </div>
            </section>
            {/* Section: Links  */}

            {/* Copyright */}
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2025 TarotScope. All Rights Reserved.
            </div>
            {/* Copyright */}
        </footer>
    );
};

export default Footer;

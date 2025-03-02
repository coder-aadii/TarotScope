import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle redirection

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // To handle navigation

    // Extract the token from the URL query string
    const getTokenFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('token');
    };

    useEffect(() => {
        const verifyEmail = async () => {
            const token = getTokenFromUrl();

            if (!token) {
                setError(true);
                setMessage('Invalid token or token is missing.');
                setLoading(false);
                return;
            }

            try {
                // Call backend to verify the email using the token
                const response = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);

                if (response.status === 200) {
                    setMessage('Email verified successfully! Redirecting to login...');
                    setLoading(false);

                    // Redirect to login page after 3 seconds
                    // setTimeout(() => {
                    //     navigate('/login');
                    // }, 3000);
                }
            } catch (error) {
                setError(true);
                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('Something went wrong. Please try again later.');
                }
                setLoading(false);
            }
        };

        verifyEmail();
    }, [navigate]);

    return (
        <div className="container text-center">
            {loading ? (
                <div>
                    <img src="https://i.gifer.com/XOsX.gif" alt="Loading..." />
                    <p>Verifying your email...</p>
                </div>
            ) : (
                <div>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    ) : (
                        <div className="alert alert-success" role="alert">
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;

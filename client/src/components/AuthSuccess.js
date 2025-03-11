import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const handleAuth = async () => {
            try {
                // Get the token from the URL query parameters
                const params = new URLSearchParams(location.search);
                const token = params.get('token');

                if (!token) {
                    console.error("No token found in URL");
                    navigate('/login');
                    return;
                }

                console.log("Token received from Google auth");
                
                // Store the token in localStorage
                localStorage.setItem('token', token);
                
                // Decode the token to get user info
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded);

                // Set user in context with more complete information
                setUser({
                    isAuthenticated: true,
                    id: decoded.userId,
                    name: decoded.name,
                    email: decoded.email
                });
                
                // Redirect to the dashboard
                navigate('/dashboard');
            } catch (error) {
                console.error("Error processing authentication:", error);
                navigate('/login');
            }
        };

        handleAuth();
    }, [location, navigate, setUser]);

    return (
        <div className="auth-success-container">
            <div className="auth-success-content">
                <h2>Authentication Successful</h2>
                <p>Redirecting you to the dashboard...</p>
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
};

export default AuthSuccess; 
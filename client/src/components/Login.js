import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { UserContext } from '../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: Check if all fields are filled
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);

            // Store token in localStorage
            localStorage.setItem('token', data.token);

            // Set user in context
            setUser({
                isAuthenticated: true,
                id: data.user.id,
                name: data.user.name,
                email: data.user.email
            });

            // Clear form and error after login
            setEmail('');
            setPassword('');

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* loading Animation */}
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <a href='/'>
                <div className='logo-img'></div>
            </a>
            <div className="login-container">
                <h2>Login</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Input with Toggle Visibility */}
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Link to Register */}
                    <p className="register-link">
                        Don't have an account? <a href="/register">Create new account</a>
                    </p>
                </form>
            </div>
        </>
    );
    
};

export default Login;

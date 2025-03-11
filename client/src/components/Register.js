import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for password strength validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: Check if all fields are filled
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        // Email format validation
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Password strength validation
        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
            );
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Terms and Conditions agreement check
        if (!agreeToTerms) {
            setError('You must agree to the terms and conditions.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                alert('Registration successful! You can now log in.');

                // Clear input fields
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAgreeToTerms(false);
                setError('');

                // Redirect to login page
                window.location.href = '/login';
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('An error occurred during registration. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <a href='/'>
                <div className='logo-img'></div>
            </a>
            <div className="login-container">
                <h2>Register</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

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

                    <div className="input-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-field checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                            />
                            I agree to the <a href="/terms">terms and conditions</a>
                        </label>
                    </div>

                    <button type="submit">Register</button>

                    <p className="register-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;

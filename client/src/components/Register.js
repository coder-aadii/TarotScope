import React, { useState } from 'react';
import '../styles/Login.css'; // Assuming the same styles apply for register

const Register = () => {
    // State to hold name, email, password, confirm password, and checkbox state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [agreeToTerms, setAgreeToTerms] = useState(false); // For terms and conditions

    // State to hold error messages
    const [error, setError] = useState('');

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

        // Password strength validation (minimum 8 characters, at least 1 letter, 1 number, and 1 special character)
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

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                // Redirect to login or perform further actions
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <>
            <a href='/'>
                <div className='logo-img'></div>
            </a>
            <div className="login-container">
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
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

                    {/* Confirm Password Input */}
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

                    {/* Terms and Conditions Checkbox */}
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

                    {/* Submit Button */}
                    <button type="submit">Register</button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    {/* Register with Google */}
                    <button className="google-login" type="button">
                        <img src="https://img.icons8.com/?size=20&id=17949&format=png&color=000000" alt="Google" />
                        Register with Google
                    </button>

                    {/* Link to Login */}
                    <p className="register-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;

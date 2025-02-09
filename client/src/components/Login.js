import React, { useState } from 'react';
import '../styles/Login.css'; // Ensure you have styles for this component

const Login = () => {
    // State to hold email, password, and checkbox state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [agreeToTerms, setAgreeToTerms] = useState(false); // For terms and conditions

    // State to hold error messages
    const [error, setError] = useState('');

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation: Check if all fields are filled
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!agreeToTerms) {
            setError('You must agree to the terms and conditions.');
            return;
        }

        // Mock login action (replace with actual authentication logic)
        console.log('Logging in with:', { email, password });

        // Clear form and error after login
        setEmail('');
        setPassword('');
        setError('');
        setAgreeToTerms(false);
    };

    return (
        <>
            <a href='/'>
                <div className='logo-img'></div>
            </a>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
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
                    <button type="submit">Login</button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    {/* Login with Google */}
                    <button className="google-login" type="button">
                        <img src="https://img.icons8.com/?size=20&id=17949&format=png&color=000000" alt="Google" />
                        Login with Google
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

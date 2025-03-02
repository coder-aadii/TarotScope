import React, { useState } from 'react';
import '../styles/Login.css'; // Ensure you have styles for this component
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    // State to hold email, password, and checkbox state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    // const [agreeToTerms, setAgreeToTerms] = useState(false); // For terms and conditions

    // State to hold error messages
    const [error, setError] = useState('');

    // State for login status
    const [loading, setLoading] = useState(false);

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: Check if all fields are filled
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // if (!agreeToTerms) {
        //     setError('You must agree to the terms and conditions.');
        //     return;
        // }

        try {
            setLoading(true);
            setError('');

            // Mock login action (replace with actual authentication logic)
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('Login successful:', data);

            // Store token in localStorage
            const token = data.token;
            localStorage.setItem('token', token);

            // Decode the token to get userId
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Assuming 'userId' is a key in your token
            console.log("User ID:", userId);

            // Clear form and error after login
            setEmail('');
            setPassword('');
            // setAgreeToTerms(false);

            // Redirect to dashboard or handle success
            window.location.href = '/dashboard'; // Redirect to dashboard
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                    {/* <div className="input-field checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                            />
                            I agree to the <a href="/terms">terms and conditions</a>
                        </label>
                    </div> */}

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

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

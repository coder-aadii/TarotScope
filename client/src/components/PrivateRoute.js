import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if token exists

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If token exists, render the child components
    return children;
};

export default PrivateRoute;

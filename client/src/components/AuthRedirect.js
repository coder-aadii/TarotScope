import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

/**
 * AuthRedirect component
 * 
 * This component checks if a user is authenticated and redirects accordingly:
 * - If user is logged in and trying to access public routes (/, /login, /register),
 *   they will be redirected to /dashboard
 * - If user is not logged in and trying to access protected routes,
 *   they will be redirected to /login (handled by PrivateRoute)
 */
const AuthRedirect = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip redirection if still loading authentication state
    if (loading) return;

    // Public routes that should redirect to dashboard if user is logged in
    const publicRoutes = ['/', '/login', '/register'];
    
    // If user is authenticated and trying to access a public route
    if (user && publicRoutes.includes(location.pathname)) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate, location.pathname]);

  // Render children regardless of redirection
  // The redirection happens via the useEffect hook
  return <>{children}</>;
};

export default AuthRedirect;
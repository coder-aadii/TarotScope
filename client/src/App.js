import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home';
import AskQuestion from './components/Dashboard/AskQuestion';
import TarotGuide from './components/Dashboard/TarotGuide';
import PastReadings from './components/Dashboard/History';  // Renamed to PastReadings for clarity
import ReadingInsights from './components/Dashboard/ReadingInsights';
import VerifyEmail from './components/verify-email';
import Profile from './components/Dashboard/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import UserProvider to manage user context
import { UserProvider } from './context/UserContext';

// Import PrivateRoute for route protection
import PrivateRoute from './components/PrivateRoute';

import TarotReading from './components/Dashboard/TarotReading';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  useEffect(() => {
    axios.get(`${apiUrl}/`)
      .then(response => console.log('Response:', response))
      .catch(error => console.error('Error:', error));
  }, []); // Runs once after initial render

  return (
    <UserProvider>  {/* Use UserProvider at the root to manage user context */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />                {/* Home page */}
            <Route path="/login" element={<Login />} />          {/* Login page */}
            <Route path="/register" element={<Register />} />    {/* Register page */}
            
            {/* Wrap protected routes with PrivateRoute */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/TarotReading" 
              element={
                <PrivateRoute>
                  <TarotReading />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/AskQuestion" 
              element={
                <PrivateRoute>
                  <AskQuestion />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/TarotGuide" 
              element={
                <PrivateRoute>
                  <TarotGuide />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/History" 
              element={
                <PrivateRoute>
                  <PastReadings />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/ReadingInsights" 
              element={
                <PrivateRoute>
                  <ReadingInsights />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/Profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/verify-email" element={<VerifyEmail />} /> {/* Verify Email */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

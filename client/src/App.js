import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home';
import CardSelection from './components/Dashboard/CardSelection';
import AboutUs from './components/AboutUs';
import AskQuestion from './components/Dashboard/AskQuestion';
import TarotGuide from './components/Dashboard/TarotGuide';
import PastReadings from './components/Dashboard/History';  // Renamed to PastReadings for clarity
import ReadingInsights from './components/Dashboard/ReadingInsights';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Profile from './components/Dashboard/Profile';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => console.log('Response:', response))
      .catch(error => console.error('Error:', error));
  }, []); // Runs once after initial render

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />                {/* Home page */}
          <Route path="/login" element={<Login />} />          {/* Login page */}
          <Route path="/register" element={<Register />} />    {/* Register page */}
          <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard page */}
          <Route path="/tarot-reading" element={<CardSelection />} />  {/* Tarot Reading page */}
          <Route path="/about" element={<AboutUs />} />        {/* About Us page */}

          {/* Dashboard-specific routes */}
          <Route path="/AskQuestion" element={<AskQuestion />} />    {/* Ask a Question */}
          <Route path="/TarotGuide" element={<TarotGuide />} />     {/* Tarot Guide */}
          <Route path="/History" element={<PastReadings />} />  {/* Past Readings */}
          <Route path="/ReadingInsights" element={<ReadingInsights />} /> {/* Reading Insights */}
          <Route path="/Profile" element={<Profile />} /> {/* User Profile */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

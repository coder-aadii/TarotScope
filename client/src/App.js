import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TarotReading from './components/TarotReading';
import Home from './components/Home';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* You can uncomment the navigation if needed */}
        {/* <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/tarot-reading">Tarot Reading</Link></li>
          </ul>
        </nav> */}

        {/* <h1>{message}</h1> */}

        <Routes>
          {/* Setting Home as the default route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tarot-reading" element={<TarotReading />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

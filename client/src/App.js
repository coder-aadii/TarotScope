import React, { useEffect } from 'react'; // Import React and useEffect
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TarotReading from './components/TarotReading';
import Home from './components/Home';
import CardSelection from './components/CardSelection';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => console.log('Response:', response))
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array so it runs only once after initial render

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/tarot-reading" element={<TarotReading />} /> */}
          <Route path="/tarot-reading" element={<CardSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

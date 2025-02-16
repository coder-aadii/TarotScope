// Display of previous readings

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from '../Footer';
import { Modal } from 'react-bootstrap';

const History = () => {
    const [readings, setReadings] = useState([]); // State to store the list of past readings
    const [filteredReadings, setFilteredReadings] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to handle search input
    const [sortOption, setSortOption] = useState(''); // State to handle sort option
    const [selectedReading, setSelectedReading] = useState(null); // State for the modal data

    useEffect(() => {
        // Fetch the past readings from the backend
        const fetchReadings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/history'); // Adjust the API endpoint if necessary
                setReadings(response.data);
                setFilteredReadings(response.data);
            } catch (error) {
                console.error('Error fetching readings:', error);
            }
        };
        fetchReadings();
    }, []);

    // Search and filter the readings
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);
        const filtered = readings.filter(reading =>
            reading.question.toLowerCase().includes(query) ||
            reading.date.toLowerCase().includes(query)
        );
        setFilteredReadings(filtered);
    };

    // Handle sorting based on date
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
        const sortedReadings = [...filteredReadings].sort((a, b) => {
            if (option === 'latest') return new Date(b.date) - new Date(a.date);
            if (option === 'oldest') return new Date(a.date) - new Date(b.date);
            return 0;
        });
        setFilteredReadings(sortedReadings);
    };

    // Handle modal open and close
    const handleReadingClick = (reading) => {
        setSelectedReading(reading);
    };

    const handleCloseModal = () => {
        setSelectedReading(null);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4" style={{ paddingTop: '30px' }}>Your Past Readings</h2>

                {/* Search bar */}
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by question or date"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {/* Sort dropdown */}
                <div className="mb-3">
                    <select className="form-select" value={sortOption} onChange={handleSortChange}>
                        <option value="">Sort By</option>
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                {/* Card grid for displaying readings */}
                <div className="row">
                    {filteredReadings.map((reading) => (
                        <div key={reading._id} className="col-md-4 mb-4">
                            <div className="card" onClick={() => handleReadingClick(reading)}>
                                <div className="card-body">
                                    <h5 className="card-title">{reading.question}</h5>
                                    <p className="card-text"><strong>Date:</strong> {new Date(reading.date).toLocaleDateString()}</p>
                                    <p className="card-text"><strong>Cards Drawn:</strong> {reading.cards.join(', ')}</p>
                                    <button className="btn btn-primary">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for detailed reading information */}
                {selectedReading && (
                    <Modal show={true} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Reading Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Question: {selectedReading.question}</h5>
                            <p><strong>Date:</strong> {new Date(selectedReading.date).toLocaleDateString()}</p>
                            <p><strong>Cards Drawn:</strong> {selectedReading.cards.join(', ')}</p>
                            <p><strong>Interpretation:</strong> {selectedReading.interpretation}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
            <Footer />
        </>
    );
};

export default History;

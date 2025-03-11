import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'; // Use the UserContext for logged-in user details
import DashboardNavbar from './DashboardNavbar';
import Footer from '../Footer';
import './History.css'; // Import the CSS file for styling

const apiUrl = process.env.REACT_APP_API_URL;

const History = () => {
    const [history, setHistory] = useState([]); // State to store history data
    const { user } = useContext(UserContext);  // Get the logged-in user info (including userId)

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;  // Ensure we have the user before proceeding
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await axios.get(`${apiUrl}/api/history/${user.userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token for authentication
                    },
                });
                setHistory(response.data); // Set the fetched history data for this user
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, [user]);  // Dependency on user, so it refetches whenever user changes

    return (
        <>
            <DashboardNavbar />  {/* Navbar Component */}
            <div className="container mt-3">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-black" style={{ paddingTop: '70px' }}>
                    Your Tarot Reading History
                </h2>
                
                {history.length === 0 ? (
                    <p className="text-center">No readings found in your history.</p>
                ) : (
                    <div className="table-responsive">
                        <h3 className="text-3xl font-bold mb-4 text-black">Past Readings</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Date</th>
                                    <th>Selected Cards</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((reading) => (
                                    <tr key={reading._id}>
                                        <td>{reading.question}</td>
                                        <td>{new Date(reading.date).toLocaleDateString()}</td>
                                        <td>
                                            <div className="cards-container">
                                                {reading.selectedCards.map((card) => (
                                                    <div key={card._id} className="card-info">
                                                        <h4 className="text-xl font-semibold mb-2">{card.name}</h4>
                                                        <p>{card.meaning.general}</p>
                                                        <p>{card.isReversed ? 'Reversed' : 'Upright'}</p>
                                                        <img
                                                            src={card.image}
                                                            alt={card.name}
                                                            className="card-image"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default History;

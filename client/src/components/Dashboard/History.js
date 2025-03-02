import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext'; // Use the UserContext for logged-in user details
import DashboardNavbar from './DashboardNavbar';
import Footer from '../Footer';
import './History.css'; // Import the CSS file for styling

const History = () => {
    const [history, setHistory] = useState([]); // State to store history data
    const { user } = useContext(UserContext);  // Get the logged-in user info (including userId)

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;  // Ensure we have the user before proceeding
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await axios.get(`http://localhost:5000/api/tarotcards/history/${user.userId}`, {
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
            <div className="history-container p-4">
                <h2 className="history-heading text-2xl font-bold mb-4" style={{ paddingTop: '30px' }}>Your Tarot Reading History</h2>
                {history.length === 0 ? (
                    <p>No history found.</p>
                ) : (
                    <div className="table-container">
                        <table className="history-table">
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
                                                        <h4>{card.name}</h4>
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

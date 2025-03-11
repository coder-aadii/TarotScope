import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import DashboardNavbar from './DashboardNavbar';
import { UserContext } from '../../context/UserContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Dashboard = () => {
    const [randomCard, setRandomCard] = useState(null);  // State to store random card
    const [currentDateTime, setCurrentDateTime] = useState(new Date());  // State to store current date and time
    const [lastReading, setLastReading] = useState(null);  // State to store the last tarot reading
    const { user, loading } = useContext(UserContext);  // Get user from context

    // Fetch "Card of the Day" and user data from the backend
    useEffect(() => {
        const fetchRandomCard = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tarotcards/day`);  // Fetch from the correct endpoint
                setRandomCard(response.data);  // Set the "Card of the Day" from the backend
            } catch (error) {
                console.error('Error fetching card of the day:', error);
            }
        };

        const fetchLastReading = async () => {
            if (!user || !user.userId) return;
            
            try {
                // Fetch the last reading for the user from the backend
                const lastReadingResponse = await axios.get(`${apiUrl}/api/history/last/${user.userId}`);
                setLastReading(lastReadingResponse.data);  // Set last reading data
            } catch (error) {
                console.error('Error fetching last reading:', error.response ? error.response.data : error.message);
            }
        };        

        fetchRandomCard();
        if (user) {
            fetchLastReading();
        }

        // Update the date and time every second (optional)
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [user]); // Add user as dependency

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <DashboardNavbar />  {/* Navbar Component */}
            <div className="container mt-3">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-black" style={{ paddingTop: '70px' }}>
                    Welcome, {user ? user.name : 'Guest'}!
                </h2>
                <p className="text-center mb-8">Your tarot journey begins here. Ready to ask the cards a question?</p>

                {/* Optional dynamic elements to enhance the dashboard */}
                {user && user.city && (
                    <div className="mt-3">
                        <h3 className="text-3xl font-bold mb-4 text-black">Your Location</h3>
                        <p>{user.city}</p>
                    </div>
                )}

                {user && user.bio && (
                    <div className="mt-3">
                        <h3 className="text-3xl font-bold mb-4 text-black">About You</h3>
                        <p>{user.bio}</p>
                    </div>
                )}

                <div className="mt-4">
                    <a href="/AskQuestion" className="btn btn-primary btn-lg">Start a Tarot Reading</a>
                </div>

                {/* Display last reading */}
                <div className="mt-5">
                    <h3 className="text-3xl font-bold mb-4 text-black">Last Reading</h3>
                    {lastReading ? (
                        <>
                            <p>Last reading date: {new Date(lastReading.date).toLocaleDateString()}</p>
                            <p>Question: {lastReading.question}</p>
                            <p>Cards drawn: {lastReading.selectedCards.map(card => card.name).join(', ')}</p>
                        </>
                    ) : (
                        <p>No readings yet</p>
                    )}
                    <a href="/History" className="btn btn-secondary">View All Past Readings</a>
                </div>

                {/* Card of the Day */}
                <div className="mt-5">
                    <h3 className="text-3xl font-bold mb-4 text-black">Card of the Day</h3>
                    {randomCard ? (
                        <>
                            <img
                                src={randomCard.image}  // Fetch card image from MongoDB
                                alt={randomCard.name}
                                width="100"
                                height="150"
                            />
                            <p><strong>{randomCard.name}</strong></p>
                            <p>{randomCard.description}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                {/* Display current date and time */}
                <div className="mt-5">
                    <h3 className="text-3xl font-bold mb-4 text-black">Today's Date and Time</h3>
                    <p>{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</p>
                </div>
            </div>
            <Footer /> {/* Footer displayed on all pages */}
        </>
    );
};

export default Dashboard;

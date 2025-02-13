import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = () => {
    const [randomCard, setRandomCard] = useState(null);  // State to store random card
    const [currentDateTime, setCurrentDateTime] = useState(new Date());  // State to store current date and time

    // Fetch random card from the backend
    useEffect(() => {
        const fetchRandomCard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tarotcards/random');
                setRandomCard(response.data);
            } catch (error) {
                console.error('Error fetching random card:', error);
            }
        };

        fetchRandomCard();

        // Update the date and time every second
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Navbar />  {/* Navbar Component */}
            <div className="container mt-5">
                <h2>Welcome, [User's Name]!</h2>
                <p>Your tarot journey begins here. Ready to ask the cards a question?</p>

                <div className="mt-4">
                    <a href="/ask-question" className="btn btn-primary btn-lg">Start a Tarot Reading</a>
                </div>

                <div className="mt-5">
                    <h4>Last Reading</h4>
                    <p>Last reading date: [Date]</p>
                    <p>Cards drawn: [Card 1], [Card 2], [Card 3]</p>
                    <a href="/past-readings" className="btn btn-secondary">View All Past Readings</a>
                </div>

                {/* Card of the Day */}
                <div className="mt-5">
                    <h4>Card of the Day</h4>
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
                <div className="mt-3">
                    <h4>Today's Date and Time</h4>
                    <p>{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</p>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

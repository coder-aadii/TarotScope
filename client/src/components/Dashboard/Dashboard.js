import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Footer from '../Footer';
import DashboardNavbar from './DashboardNavbar';

const Dashboard = () => {
    const [randomCard, setRandomCard] = useState(null);  // State to store random card
    const [currentDateTime, setCurrentDateTime] = useState(new Date());  // State to store current date and time
    const [user, setUser] = useState(null);  // State to store user data

    // Fetch "Card of the Day" and user data from the backend
    useEffect(() => {
        const fetchRandomCard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tarotcards/day');  // Fetch from the correct endpoint
                setRandomCard(response.data);  // Set the "Card of the Day" from the backend
            } catch (error) {
                console.error('Error fetching card of the day:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                // Retrieve the JWT token from local storage
                const token = localStorage.getItem('token');
                
                if (token) {
                    // Decode the token to get user information
                    const decodedToken = jwtDecode(token);
                    
                    // Assuming the decoded token has a user ID field
                    const userId = decodedToken.userId;

                    // Fetch user data from the backend using the user ID
                    const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
                    console.log(response.data); // Log the API response

                    // Destructuring to get only the required fields: name, bio, and city
                    const { name, bio, city } = response.data;

                    // Set the fetched data to user state
                    setUser({ name, bio, city });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchRandomCard();
        fetchUserData();

        // Update the date and time every second (optional)
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <DashboardNavbar />  {/* Navbar Component */}
            <div className="container mt-5" style={{ paddingTop: '30px' }}>
                <h2>Welcome, {user ? user.name : 'Loading...'}!</h2>
                <p>Your tarot journey begins here. Ready to ask the cards a question?</p>

                {/* Optional dynamic elements to enhance the dashboard */}
                {user && user.city && (
                    <div className="mt-3">
                        <h4>Your Location</h4>
                        <p>{user.city}</p>
                    </div>
                )}

                {user && user.bio && (
                    <div className="mt-3">
                        <h4>About You</h4>
                        <p>{user.bio}</p>
                    </div>
                )}

                <div className="mt-4">
                    <a href="/AskQuestion" className="btn btn-primary btn-lg">Start a Tarot Reading</a>
                </div>

                <div className="mt-5">
                    <h4>Last Reading</h4>
                    <p>Last reading date: [Date]</p>
                    <p>Cards drawn: [Card 1], [Card 2], [Card 3]</p>
                    <a href="/History" className="btn btn-secondary">View All Past Readings</a>
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
            <Footer /> {/* Footer displayed on all pages */}
        </>
    );
};

export default Dashboard;

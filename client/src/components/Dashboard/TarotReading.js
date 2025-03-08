import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './DashboardNavbar';
import Footer from '../Footer';

import './TarotReading.css';

const shuffleSoundUrl = 'https://www.soundjay.com/misc/sounds/shuffling-cards-1.mp3';
const apiUrl = process.env.REACT_APP_API_URL;

const TarotReading = () => {
    const { state } = useLocation();
    const [setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // To track if the user submitted the cards
    const [aiReading, setAiReading] = useState(''); // AI-generated reading state

    useEffect(() => {
        console.log('AI Reading:', aiReading); // Debugging: Check if AI reading is set
    }, [aiReading]);

    const playShuffleSound = () => {
        const shuffleSound = new Audio(shuffleSoundUrl);
        shuffleSound.play();
    };

    const shuffleCards = async () => {
        setIsShuffling(true); // Show the shuffle animation
        playShuffleSound(); // Play shuffle sound

        setTimeout(async () => {
            try {
                const response = await axios.get('/api/tarot/three-random-cards');
                const shuffledCards = response.data;
                setCards(shuffledCards);
            } catch (error) {
                console.error('Error fetching shuffled cards:', error);
            } finally {
                setIsShuffling(false); // Hide the shuffle animation after 3 seconds, even if there's an error
            }
        }, 3000); // 3 seconds delay for animation
    };

    const handleCardSelection = (idx) => {
        if (selectedCards.includes(idx)) {
            // If the card is already selected, unselect it
            setSelectedCards(selectedCards.filter((card) => card !== idx));
        } else if (selectedCards.length < 3) {
            // Select card if less than 3 cards have been selected
            setSelectedCards([...selectedCards, idx]);
        }
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token'); // Get JWT from localStorage

            if (!token) {
                console.error("No token found. Please login.");
                return;
            }

            // Prepare the selectedCardIds as query parameters
            const selectedCardIds = selectedCards.map(card => card.id).join(',');

            // Make a GET request to fetch card details based on selected card IDs
            const response = await axios.get(`${apiUrl}/api/tarotcards/three-random-cards`, {
                params: {
                    selectedCardIds
                }
            });

            const interpretedCards = response.data;

            // Update the state with interpreted card data
            setSelectedCards(interpretedCards);
            setIsSubmitted(true); // Show the result page after submitting

            // Save the reading history
            const historyData = {
                userId: state?.userId || 'defaultUserId', // Replace with actual user ID from context or state
                selectedCards: interpretedCards,
                question: state?.question || 'Default Question' // Add any relevant question or reading context
            };

            // Post request to store the reading history with Authorization header
            await axios.post(`${apiUrl}/api/tarotcards/history`, historyData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                }
            });

            const tarotInterpretation = response.data.interpretation;

            console.log('Tarot Interpretation:', tarotInterpretation); // Debugging: Check AI-generated reading

            // Set AI-generated reading
            setAiReading(tarotInterpretation);

        } catch (error) {
            console.error('Error fetching card interpretations or saving history:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container p-4">
                {!isSubmitted ? (
                    <>
                        {/* Show card deck if not submitted */}
                        {isShuffling ? (
                            <div className="deck-animation">
                                <img
                                    src="https://res.cloudinary.com/deoegf9on/image/upload/v1740836703/Shuffling_Las_Vegas_Sticker_by_Anni_Bernet_-_Find_Share_on_GIPHY_b50jzu.gif"
                                    alt="Shuffling Animation"
                                    className="img-fluid"
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className="display-5 mb-4" style={{ paddingTop: '40px' }}>Select Three Cards</h2>
                                <p className="text-muted mb-4">Click on three cards to select them.</p>

                                <div className="card-deck d-flex justify-content-center position-relative">
                                    {[...Array(48)].map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`card ${selectedCards.includes(idx + 1) ? 'selected-card' : ''}`}
                                            style={{
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                width: '100px',
                                                height: '150px',
                                                left: `${idx * 25}px`,
                                                zIndex: idx,
                                            }}
                                            onClick={() => handleCardSelection(idx + 1)}
                                        >
                                            <img
                                                src="https://res.cloudinary.com/deoegf9on/image/upload/v1740566464/card-back-1-min_tn0ses.png"
                                                alt={`Card ${idx + 1}`}
                                                className="img-fluid"
                                                style={{ width: '100px', height: '150px' }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Button changes from shuffle to submit after selecting 3 cards */}
                                <div className="d-flex justify-content-center mt-4">
                                    {selectedCards.length === 3 ? (
                                        <button className="btn btn-success" onClick={handleSubmit}>
                                            Submit Cards
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary" onClick={shuffleCards}>
                                            Shuffle Cards
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>

                        {/* Show full-page result after submitting */}
                        <h3 className="display-4 text-center mt-5">Your Three-Card Reading</h3>

                        {/* Show user's question above the cards */}
                        <h4 className="text-center mt-4 text-uppercase">
                            Question: {state?.question || 'Your Question'}
                        </h4>

                        <div className="result-container">
                            {selectedCards.map((card, index) => (
                                <div key={index} className="card-result">
                                    <h4 className="card-heading">
                                        {index === 0 && 'What is going on around?'}
                                        {index === 1 && 'What the obstacle is?'}
                                        {index === 2 && 'The likely outcome'}
                                    </h4>
                                    <img
                                        src={card?.image}
                                        alt={card?.name || 'Unknown Card'}
                                        className="card-img"
                                    />
                                    <h4 className="card-name">{card?.name || 'Unknown Name'}</h4>
                                    <p className="card-status">{card?.isReversed ? 'Reversed' : 'Upright'}</p>
                                    <p className="card-meaning">{card?.meaning?.general || 'No meaning available'}</p>
                                </div>
                            ))}
                        </div>

                        {/* Display AI-generated reading below the cards */}
                        {aiReading ? (
                            <div className="ai-reading-box mt-4 p-3">
                                <h4>AI-Generated Tarot Reading</h4>
                                <p>{aiReading}</p>
                            </div>
                        ) : (
                            <p>Loading AI-generated reading...</p>
                        )}

                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default TarotReading;

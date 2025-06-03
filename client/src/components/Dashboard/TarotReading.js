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
            console.log('Fetching interpreted cards with selectedCardIds:', selectedCardIds);
            const response = await axios.get(`${apiUrl}/api/tarotcards/three-random-cards`, {
                params: {
                    selectedCardIds
                }
            });
    
            const interpretedCards = response.data;
            console.log('Interpreted Cards:', interpretedCards); // Log the fetched card details
    
            // Update the state with interpreted card data
            setSelectedCards(interpretedCards);
            setIsSubmitted(true); // Show the result page after submitting
    
            console.log('Question:', state?.question);
            console.log('Question Type:', state?.questionType);
    
            // Save the reading history
            const historyData = {
                userId: state?.userId || 'defaultUserId', // Replace with actual user ID from context or state
                selectedCards: interpretedCards,
                question: state?.question || 'Default Question', // Add any relevant question or reading context
                questionType: state?.questionType || 'general' // Ensure questionType is saved in history
            };
    
            console.log('Saving history data:', historyData); // Log the history data being sent
    
            // Post request to store the reading history with Authorization header
            await axios.post(`${apiUrl}/api/tarotcards/history`, historyData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in Authorization header
                }
            });
    
            // AI Interpretation (No Bearer Token for AI request)
            const aiRequestData = {
                question: historyData.question,
                questionType: historyData.questionType,
                selectedCards: interpretedCards.map(card => {
                    // Log each card's data for better debugging
                    console.log('Processing card:', card);
    
                    // Safeguard against undefined meanings
                    const meaningsForType = card.meanings?.[historyData.questionType];
                    if (!meaningsForType) {
                        console.warn(`No meanings found for question type '${historyData.questionType}' in card:`, card.name);
                        return {
                            name: card.name,
                            isReversed: card.isReversed,
                            meaning: `No ${historyData.questionType} meaning available.`, // Default message when meanings are missing
                        };
                    }
    
                    // Log the specific meaning for the card
                    console.log(`Found meanings for '${historyData.questionType}' in card '${card.name}':`, meaningsForType);
    
                    return {
                        name: card.name,
                        isReversed: card.isReversed,
                        meaning: meaningsForType[card.isReversed ? 'reversed' : 'upright'] || `No specific ${historyData.questionType} meaning found.`, // Safeguard for missing upright/reversed meanings
                    };
                })
            };
    
            console.log('Sending AI tarot interpretation request with:', aiRequestData); // Log AI request data
    
            const tarotInterpretationResponse = await axios.post(`${apiUrl}/api/tarotcards/interpretation`, aiRequestData);
    
            console.log('AI tarot interpretation response:', tarotInterpretationResponse.data); // Log the response from the AI
    
            if (tarotInterpretationResponse.data?.interpretation) {
                // Set AI-generated reading
                setAiReading(tarotInterpretationResponse.data.interpretation);
            } else {
                console.error('Invalid AI interpretation response:', tarotInterpretationResponse.data);
            }
    
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

                                <div className="card-deck-container">
                                    {/* Desktop view - stacked cards */}
                                    <div className="card-deck d-none d-md-flex justify-content-center position-relative">
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
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onClick={() => handleCardSelection(idx + 1)}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-15px)';
                                                    e.currentTarget.style.zIndex = '100';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.zIndex = idx;
                                                }}
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

                                    {/* Mobile view - 3 rows of stacked cards */}
                                    <div className="d-md-none">
                                        <div className="card-deck">
                                            {/* First row - stacked cards */}
                                            <div className="card-row">
                                                {[...Array(16)].map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`mobile-card ${selectedCards.includes(idx + 1) ? 'selected-card' : ''}`}
                                                        style={{
                                                            left: `calc(50% - 50px + ${idx * 12}px)`,
                                                            zIndex: idx,
                                                            transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                                                        }}
                                                        onClick={() => handleCardSelection(idx + 1)}
                                                    >
                                                        <img
                                                            src="https://res.cloudinary.com/deoegf9on/image/upload/v1740566464/card-back-1-min_tn0ses.png"
                                                            alt={`Card ${idx + 1}`}
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Second row - stacked cards */}
                                            <div className="card-row">
                                                {[...Array(16)].map((_, idx) => (
                                                    <div
                                                        key={idx + 16}
                                                        className={`mobile-card ${selectedCards.includes(idx + 17) ? 'selected-card' : ''}`}
                                                        style={{
                                                            left: `calc(50% - 50px + ${idx * 12}px)`,
                                                            zIndex: idx,
                                                            transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                                                        }}
                                                        onClick={() => handleCardSelection(idx + 17)}
                                                    >
                                                        <img
                                                            src="https://res.cloudinary.com/deoegf9on/image/upload/v1740566464/card-back-1-min_tn0ses.png"
                                                            alt={`Card ${idx + 17}`}
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Third row - stacked cards */}
                                            <div className="card-row">
                                                {[...Array(16)].map((_, idx) => (
                                                    <div
                                                        key={idx + 32}
                                                        className={`mobile-card ${selectedCards.includes(idx + 33) ? 'selected-card' : ''}`}
                                                        style={{
                                                            left: `calc(50% - 50px + ${idx * 12}px)`,
                                                            zIndex: idx,
                                                            transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                                                        }}
                                                        onClick={() => handleCardSelection(idx + 33)}
                                                    >
                                                        <img
                                                            src="https://res.cloudinary.com/deoegf9on/image/upload/v1740566464/card-back-1-min_tn0ses.png"
                                                            alt={`Card ${idx + 33}`}
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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
                            <div className="ai-reading-box mt-4 p-4 shadow-sm">
                                <h4 className="text-center mb-3">Your Personalized Tarot Reading</h4>
                                <div className="reading-content">
                                    <p className="lead">{aiReading}</p>
                                </div>
                                <div className="text-center mt-3">
                                    <small className="text-muted">
                                        This reading was generated by AI based on your question and the selected cards.
                                    </small>
                                </div>
                            </div>
                        ) : (
                            <div className="ai-reading-loading mt-4 p-4 text-center">
                                <div className="spinner-border text-primary mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h5 className="mb-3">Creating Your Personalized Tarot Reading</h5>
                                <p className="mb-2">Our AI is carefully analyzing your cards and question...</p>
                                <p className="text-muted">
                                    <small>
                                        This may take up to 20-30 seconds. The AI is crafting a detailed interpretation 
                                        based on your specific question and the unique combination of cards you've drawn.
                                    </small>
                                </p>
                                <div className="progress mt-3" style={{ height: "5px" }}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                         role="progressbar" 
                                         style={{ width: "100%" }}
                                         aria-valuenow="100" 
                                         aria-valuemin="0" 
                                         aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        )}

                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default TarotReading;

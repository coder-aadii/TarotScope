// Deck of cards for selection

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Dashboard/styles/CardSelection.css'; // Correct the path

const CardSelection = () => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);

    // Fetch tarot cards from the backend
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('/api/tarot/cards');
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching tarot cards:', error);
            }
        };
        fetchCards();
    }, []);

    // Handle card selection
    const selectCard = (card) => {
        if (selectedCards.length < 3) {
            setSelectedCards([...selectedCards, card]);
        }
    };

    return (
        <div className="card-selection">
            <h2>Choose 3 Cards for Your Reading</h2>
            <div className="deck">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`tarot-card ${selectedCards.includes(card) ? 'selected' : ''}`}
                        onClick={() => selectCard(card)}
                    >
                        <img src={card.image} alt={card.name} />
                    </div>
                ))}
            </div>
            {selectedCards.length === 3 && (
                <div className="reading-result">
                    <h3>Your Reading</h3>
                    {selectedCards.map((card, index) => (
                        <div key={index} className="card-interpretation">
                            <h4>{index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'}: {card.name}</h4>
                            <p>{card.meanings.upright.general}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardSelection;

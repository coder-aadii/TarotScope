import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Assuming Navbar is a local component
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReadingInsights = () => {
    const [readingStats, setReadingStats] = useState(null); // Store reading stats
    const [cardFrequency, setCardFrequency] = useState(null); // Store card appearance data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchInsightsData = async () => {
            try {
                // Fetching data from backend (assuming appropriate endpoints exist)
                const readingResponse = await axios.get('http://localhost:5000/api/readingStats');
                const cardFrequencyResponse = await axios.get('http://localhost:5000/api/cardFrequency');

                // Set data to states
                setReadingStats(readingResponse.data);
                setCardFrequency(cardFrequencyResponse.data);
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error('Error fetching insights data:', error);
                setError('Failed to load insights data. Please try again later.');
                setLoading(false);
            }
        };

        fetchInsightsData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Sample colors for the Pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Ensure data exists before rendering
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Reading Insights</h2>

                {/* Reading Frequency Section */}
                {readingStats && readingStats.readingFrequency && (
                    <div className="row mb-5">
                        <div className="col-12">
                            <h4>Reading Frequency Over Time</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={readingStats.readingFrequency}>
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="readings" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Card Appearance Frequency Section */}
                {cardFrequency && cardFrequency.cards && (
                    <div className="row mb-5">
                        <div className="col-12 col-md-6">
                            <h4>Card Appearance Frequency</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={cardFrequency.cards}
                                        dataKey="frequency"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {cardFrequency.cards.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Upright vs Reversed Cards */}
                        {cardFrequency.uprightVsReversed && (
                            <div className="col-12 col-md-6">
                                <h4>Upright vs Reversed Cards</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={cardFrequency.uprightVsReversed}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#82ca9d"
                                            label
                                        >
                                            {cardFrequency.uprightVsReversed.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                )}

                {/* Common Themes Section */}
                {readingStats && readingStats.commonThemes && (
                    <div className="row mb-5">
                        <div className="col-12">
                            <h4>Common Reading Themes</h4>
                            <ul className="list-group">
                                {readingStats.commonThemes.map((theme, index) => (
                                    <li className="list-group-item" key={index}>
                                        {theme}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Favorite Cards Section */}
                {readingStats && readingStats.favoriteCards && (
                    <div className="row mb-5">
                        <div className="col-12">
                            <h4>Favorite Cards</h4>
                            <ul className="list-group">
                                {readingStats.favoriteCards.map((card, index) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                        <span>{card.name}</span>
                                        <img src={card.image} alt={card.name} width="40" height="60" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReadingInsights;

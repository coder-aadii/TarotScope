import React, { useEffect, useState, useContext } from 'react'; // Add useContext
import Navbar from './DashboardNavbar';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Footer from '../Footer';
import { UserContext } from '../../context/UserContext'; // Ensure the correct path to userContext

const apiUrl = process.env.REACT_APP_API_URL;

const ReadingInsights = () => {
    const { user } = useContext(UserContext); // Use useContext to access user from UserContext
    const [readingStats, setReadingStats] = useState(null);
    const [cardFrequency, setCardFrequency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInsightsData = async () => {
            if (!user || !user.userId) {
                console.error('User ID is missing or user is not logged in.');
                return;
            }

            try {
                const readingResponse = await axios.get(`${apiUrl}/api/insights/readingStats/${user.userId}`);
                const cardFrequencyResponse = await axios.get(`${apiUrl}/api/insights/cardFrequency/${user.userId}`);

                setReadingStats(readingResponse.data);
                setCardFrequency(cardFrequencyResponse.data);
            } catch (error) {
                console.error('Error fetching insights data:', error);
                setError('No reading history found. Start your first reading to see insights!');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchInsightsData();
        }
    }, [user]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-black" style={{ paddingTop: '70px' }}>Reading Insights</h2>

                {loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading your reading insights...</p>
                    </div>
                ) : error ? (
                    <div className="text-center mt-5">
                        <div className="alert alert-info" role="alert">
                            <h4 className="alert-heading">Welcome to Reading Insights!</h4>
                            <p>{error}</p>
                            <hr />
                            <p className="mb-0">
                                Get started with your first reading to unlock personalized insights and statistics.
                                <br />
                                <a href="/AskQuestion" className="btn btn-primary mt-3">Start Your First Reading</a>
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Reading Frequency Section */}
                        {readingStats && readingStats.readingFrequency && readingStats.readingFrequency.length > 0 && (
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
                        {cardFrequency && cardFrequency.cards && cardFrequency.cards.length > 0 && (
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
                                {cardFrequency.uprightVsReversed && cardFrequency.uprightVsReversed.length > 0 && (
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
                        {readingStats && readingStats.commonThemes && readingStats.commonThemes.length > 0 && (
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
                        {readingStats && readingStats.favoriteCards && readingStats.favoriteCards.length > 0 && (
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
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ReadingInsights;

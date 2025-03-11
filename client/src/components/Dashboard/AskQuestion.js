import React, { useState } from 'react';
import Navbar from './DashboardNavbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom'; // To redirect to TarotReading

import './AskQuestion.css';

const AskQuestion = () => {
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');
    const [submitted, setSubmitted] = useState(false); // State for submission status
    const navigate = useNavigate(); // For redirection

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionType && question) {
            setSubmitted(true);  // Mark as submitted
            // Pass the question type and question as route state or props while navigating to TarotReading
            navigate('/TarotReading', { state: { questionType, question } }); // Redirect to TarotReading page
        } else {
            alert('Please select a question type and ask your question.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-black" style={{ paddingTop: '70px' }}>
                    Ask Your Tarot Question
                </h2>
                <p className="text-center mb-8">Choose a question type and ask the tarot.</p>

                <div className="mb-5">
                    <h3 className="text-3xl font-bold mb-4 text-black">Question Type</h3>
                    <div className="ms-4">
                        <label className="form-check-label d-block mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                name="questionType"
                                value="general"
                                checked={questionType === 'general'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            General Question
                        </label>
                        <label className="form-check-label d-block mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                name="questionType"
                                value="love"
                                checked={questionType === 'love'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            Love Question
                        </label>
                        <label className="form-check-label d-block mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                name="questionType"
                                value="career"
                                checked={questionType === 'career'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            Career Question
                        </label>
                        <label className="form-check-label d-block mb-3">
                            <input
                                type="radio"
                                className="form-check-input me-2"
                                name="questionType"
                                value="finance"
                                checked={questionType === 'finance'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            Finance Question
                        </label>
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="text-3xl font-bold mb-4 text-black">Your Question</h3>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary btn-lg px-5" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                {/* Display a confirmation message when submitted */}
                {submitted && (
                    <div className="alert alert-success mt-4">
                        Your question has been submitted! Redirecting to Tarot Reading...
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AskQuestion;

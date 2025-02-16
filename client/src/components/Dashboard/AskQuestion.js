import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../Footer';

const AskQuestion = ({ onSubmit }) => {
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionType && question) {
            onSubmit({ questionType, question });
        } else {
            alert('Please select a question type and ask your question.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container p-4">
                <h2 className="display-4 mb-4" style={{ paddingTop: '70px' }}>Ask Your Tarot Question</h2>
                <p className="text-muted mb-4">Choose a question type and ask the tarot.</p>

                <div className="mb-4">
                    <h3 className="h5 mb-2">Question Type</h3>
                    <div>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="questionType"
                                value="yesNo"
                                checked={questionType === 'yesNo'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            Yes/No Question
                        </label>
                        <br />
                        <label className="form-check-label">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="questionType"
                                value="detailed"
                                checked={questionType === 'detailed'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            Detailed Question
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="h5 mb-2">Your Question</h3>
                    <input
                        type="text"
                        className="form-control w-75"
                        placeholder="Type your question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-primary w-50"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

            </div>
            <Footer />
        </>
    );
};

export default AskQuestion;

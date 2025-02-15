// Input field for Yes/No and Detailed question types

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
            <div className="ask-question-container p-4">
                <h2 className="text-2xl font-bold mb-4" style={{ paddingTop: '70px' }}>Ask Your Tarot Question</h2>
                <p className="text-gray-600 mb-4">Choose a question type and ask the tarot.</p>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Question Type</h3>
                    <div className="space-y-">
                        <label>
                            <input
                                type="radio"
                                name="questionType"
                                value="yesNo"
                                checked={questionType === 'yesNo'}
                                onChange={(e) => setQuestionType(e.target.value)}
                            />
                            Yes/No Question
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
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
                    <h3 className="text-lg font-semibold mb-2">Your Question</h3>
                    <input
                        type="text"
                        className="w-3/4 p-2 border border-gray-300 rounded-md"
                        placeholder="Type your question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <button
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md"
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

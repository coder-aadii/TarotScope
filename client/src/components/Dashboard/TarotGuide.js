import React, { useState } from 'react';
import Footer from '../Footer';
import Navbar from './DashboardNavbar';

const TarotGuide = () => {
    const [expanded, setExpanded] = useState(null);

    const toggleFAQ = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2 className='text-4xl font-extrabold mb-8 text-center text-black' style={{ paddingTop: '70px' }}>Tarot Guide</h2>

                <section className='mb-12'>
                    <h3 className='text-3xl font-bold mb-4 text-black'>Introduction to Tarot Reading</h3>
                    <p className='text-base leading-relaxed mb-4'>
                        Tarot reading is an ancient practice of divination using a deck of tarot cards. Each card has a unique meaning, and when drawn in a specific spread, they can provide guidance and insight.
                    </p>
                </section>

                <section className='mb-12'>
                    <h3 className='text-3xl font-bold mb-4 text-black'>How TarotScope Works</h3>
                    <ul className='list-disc list-inside text-lg space-y-3'>
                        <li>Log in or create an account.</li>
                        <li>Choose a tarot spread (Three-Card Spread is currently available).</li>
                        <li>Ask a question and select cards.</li>
                        <li>Get your reading and save it for future reference.</li>
                    </ul>
                </section>

                <section className='mb-12'>
                    <h3 className='text-3xl font-bold mb-4 text-black'>Tarot Spreads</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <div className='bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
                            <h4 className='text-xl font-semibold mb-2 text-yellow-400'>Three-Card Spread</h4>
                            <p>This spread offers quick insights into your past, present, and future.</p>
                        </div>
                        <div className='bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
                            <h4 className='text-xl font-semibold mb-2 text-yellow-400'>Celtic Cross Spread</h4>
                            <p>A comprehensive 10-card spread providing deep insights. (Coming Soon)</p>
                        </div>
                        <div className='bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
                            <h4 className='text-xl font-semibold mb-2 text-yellow-400'>Seven-Card Horseshoe Spread</h4>
                            <p>Gain insights into the past, present, hidden influences, and outcomes. (Coming Soon)</p>
                        </div>
                        <div className='bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
                            <h4 className='text-xl font-semibold mb-2 text-yellow-400'>Romany Spread</h4>
                            <p>A flexible spread offering general overviews or interconnected issues. (Coming Soon)</p>
                        </div>
                        <div className='bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform'>
                            <h4 className='text-xl font-semibold mb-2 text-yellow-400'>Path Spread</h4>
                            <p>Compare current actions with desired outcomes, focusing on behaviors. (Coming Soon)</p>
                        </div>
                    </div>
                </section>

                <section className='mb-12'>
                    <h3 className='text-3xl font-bold mb-4 text-black'>FAQs</h3>
                    <div className='space-y-6'>
                        <div>
                            <h4 className='cursor-pointer text-lg font-semibold mb-2 text-black-400' onClick={() => toggleFAQ(0)}>
                                What is Tarot Reading? {expanded === 0 ? '-' : '+'}
                            </h4>
                            {expanded === 0 && <p className='text-black-200 text-base'>Tarot reading is a tool used to gain insights by interpreting tarot cards.</p>}
                        </div>
                        <div>
                            <h4 className='cursor-pointer text-lg font-semibold mb-2 text-black-400' onClick={() => toggleFAQ(1)}>
                                Can I ask any question? {expanded === 1 ? '-' : '+'}
                            </h4>
                            {expanded === 1 && <p className='text-black-200 text-base'>Yes, you can ask about love, career, or personal growth.</p>}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default TarotGuide;

// Tarot Guide Page with Tailwind CSS and Navbar/Footer

import React from 'react';
import Footer from '../Footer';
import Navbar from './DashboardNavbar';

const TarotGuide = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            {/* Main Content */}
            <main className='flex-grow container mx-auto px-4 py-8'>
                <h2 className='text-3xl font-bold mb-6 text-center' style={{ paddingTop: '70px' }}>Tarot Guide</h2>
                <section className='mb-8'>
                    <h3 className='text-2xl font-semibold mb-4'>Introduction to Tarot Reading</h3>
                    <p className='text-gray-700 mb-4'>Tarot reading is an ancient practice of divination using a deck of tarot cards. Each card has a unique meaning, and when drawn in a specific spread, they can provide guidance and insight.</p>
                </section>

                <section className='mb-8'>
                    <h3 className='text-2xl font-semibold mb-4'>How TarotScope Works</h3>
                    <ul className='list-disc list-inside text-gray-700 mb-4'>
                        <li>Step 1: Log in or create an account.</li>
                        <li>Step 2: Choose a tarot spread (Three-Card Spread is currently available).</li>
                        <li>Step 3: Ask a question and select cards.</li>
                        <li>Step 4: Get your reading and save it for future reference.</li>
                    </ul>
                </section>

                <section className='mb-8'>
                    <h3 className='text-2xl font-semibold mb-4'>Tarot Spreads</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <h4 className='text-xl font-semibold mb-2'>Three-Card Spread</h4>
                            <p className='text-gray-700'>This spread is perfect for a quick insight into your past, present, and future.</p>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <h4 className='text-xl font-semibold mb-2'>Celtic Cross Spread</h4>
                            <p className='text-gray-700'>A comprehensive 10-card spread that provides insights into a specific question or situation, covering aspects like the present, challenges, past influences, and future outcomes. (Coming Soon)</p>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <h4 className='text-xl font-semibold mb-2'>Seven-Card Horseshoe Spread</h4>
                            <p className='text-gray-700'>A seven-card spread that provides insights into the past, present, hidden influences, the querent, attitudes of others, advice, and the likely outcome. (Coming Soon)</p>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <h4 className='text-xl font-semibold mb-2'>Romany Spread</h4>
                            <p className='text-gray-700'>A flexible spread that can be used for general overviews or interconnected issues, allowing for intuitive interpretations. (Coming Soon)</p>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <h4 className='text-xl font-semibold mb-2'>Path Spread</h4>
                            <p className='text-gray-700'>A spread that compares current actions with suggested behaviors to achieve a desired outcome, focusing on rational, emotional, and external stances. (Coming Soon)</p>
                        </div>
                    </div>
                </section>

                <section className='mb-8'>
                    <h3 className='text-2xl font-semibold mb-4'>FAQs</h3>
                    <div className='space-y-4'>
                        <div>
                            <h4 className='font-semibold text-lg'>What is Tarot Reading?</h4>
                            <p className='text-gray-700'>Tarot reading is a tool used to gain insights and clarity by interpreting tarot cards.</p>
                        </div>
                        <div>
                            <h4 className='font-semibold text-lg'>Can I ask any question?</h4>
                            <p className='text-gray-700'>Yes, you can ask about any topic, whether it's love, career, or personal development.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default TarotGuide;

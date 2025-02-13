import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-container p-4 sm:p-8 text-gray-700 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-purple-700 mb-8">
        About <span className="text-purple-600">TarotScope</span>
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 max-w-4xl mx-auto text-center">
        Welcome to <span className="text-purple-600 font-semibold">TarotScope</span> — your personalized tarot reading experience! 
        Discover the ancient art of tarot reading, guided by our intuitive platform. 
        Whether you're seeking insights into love, career, or life in general, TarotScope will walk you through a journey of reflection and enlightenment.
      </p>
      
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-purple-600">
        How TarotScope Works
      </h2>

      <div className="workflow grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 max-w-6xl mx-auto">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">1. Landing Page</h3>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Start your journey by either logging in or registering for an account if you're new to TarotScope. This is where your personal insights begin!
          </p>
        </div>
        
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">2. Login/Register</h3>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Once you've successfully logged in or signed up, you'll be redirected to your dashboard — the starting point for all your tarot readings.
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">3. Dashboard Home</h3>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            From the dashboard, you're free to choose between starting a new tarot reading session or exploring your past readings. The choice is yours!
          </p>
        </div>
        
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">4. Tarot Reading</h3>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Here’s where the magic happens. Ask a question, select the popular Three-Card Spread, and watch as the tarot deck animates before your eyes.
            Choose your cards, and let the universe reveal its guidance.
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">5. Reading Result</h3>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Once you’ve chosen your cards, TarotScope will interpret their meanings and display your personalized reading. You also have the option to save this reading for future reference.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-700">6. Past Readings</h3>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Curious about your previous readings? Visit the history page, where you can browse through all your saved tarot readings and reflect on the guidance you've received.
          </p>
        </div>
      </div>

      <p className="text-lg sm:text-xl text-center leading-relaxed max-w-4xl mx-auto mb-10">
        TarotScope is your companion in seeking clarity, direction, and wisdom. Let the cards guide you on your path!
      </p>

      <div className="text-center">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all shadow-lg">
          Start Your Reading
        </button>
      </div>
    </div>
  );
};

export default AboutUs;

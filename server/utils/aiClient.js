/**
 * AI API Client Utility
 * 
 * This module provides a wrapper for interacting with OpenRouter AI API
 * for generating AI-powered tarot readings.
 */

const axios = require('axios');
const logger = require('./logger');
require('dotenv').config();

// Default model if not specified in environment variables
const DEFAULT_MODEL = 'mistralai/mistral-7b-instruct';

/**
 * AIClient class for handling API interactions
 */
class AIClient {
    constructor() {
        this.apiKey = process.env.OPENROUTER_API_KEY;
        this.apiUrl = process.env.OPENROUTER_API_URL;
        this.model = process.env.AI_MODEL || DEFAULT_MODEL;
        
        if (!this.apiKey) {
            logger.warn('Warning: OPENROUTER_API_KEY not found in environment variables. AI API calls will fail.');
        }
        
        if (!this.apiUrl) {
            logger.warn('Warning: OPENROUTER_API_URL not found in environment variables. AI API calls will fail.');
        }
    }

    /**
     * Generate a tarot reading based on the provided prompt
     * 
     * @param {string} prompt - The formatted prompt for the model
     * @param {Object} options - Additional options for the API request
     * @returns {Promise<string>} - The generated text
     */
    async generateReading(prompt, options = {}) {
        try {
            // OpenRouter chat completions format
            const requestBody = {
                model: this.model,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: options.maxTokens || 400,
                temperature: options.temperature || 0.7,
                top_p: options.topP || 0.9,
                stream: false
            };

            logger.info(`Making request to OpenRouter AI with model: ${this.model}`);

            // Make the API request
            const response = await axios.post(
                this.apiUrl,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'https://tarotscope.netlify.app',
                        'X-Title': 'TarotScope'
                    },
                    timeout: options.timeout || 30000
                }
            );

            // Process the OpenRouter response
            return this.processOpenRouterResponse(response.data);
        } catch (error) {
            logger.error('Error in OpenRouter API call:', error);
            
            // If it's a 402 (Payment Required) or 401 (Unauthorized) error, provide a fallback response
            if (error.response && (error.response.status === 402 || error.response.status === 401)) {
                logger.warn('OpenRouter API error, providing fallback interpretation');
                return this.generateFallbackReading(prompt);
            }
            
            throw this.formatError(error);
        }
    }

    /**
     * Generate a fallback reading when the API is unavailable
     * 
     * @param {string} prompt - The original prompt
     * @returns {string} - A fallback interpretation
     */
    generateFallbackReading(prompt) {
        // Extract question and cards from the prompt for a basic interpretation
        const questionMatch = prompt.match(/Question: "([^"]+)"/);
        const question = questionMatch ? questionMatch[1] : 'your question';
        
        return `Thank you for your question about ${question}. While our AI interpretation service is temporarily unavailable, here's a general guidance based on your three-card spread: 

The cards you've drawn suggest a journey of transformation and growth. The first card represents your current situation and the energies surrounding you. The second card highlights the challenges or obstacles you may need to navigate. The third card offers insight into the potential outcome or the path forward.

Remember that tarot readings are meant to provide guidance and reflection rather than fixed predictions. The cards encourage you to trust your intuition, stay open to new possibilities, and approach your situation with both wisdom and courage. Consider how the themes of your cards might apply to your current circumstances and what actions you might take to move forward positively.

We apologize for the temporary service interruption and appreciate your understanding.`;
    }

    /**
     * Process the response from OpenRouter API
     * 
     * @param {any} data - The response data from the API
     * @returns {string} - The processed generated text
     */
    processOpenRouterResponse(data) {
        try {
            if (data && data.choices && data.choices.length > 0) {
                const choice = data.choices[0];
                if (choice.message && choice.message.content) {
                    return choice.message.content.trim();
                }
            }
            throw new Error('Unexpected OpenRouter API response format');
        } catch (error) {
            logger.error('Error processing OpenRouter response:', error);
            logger.debug('Response data:', JSON.stringify(data, null, 2));
            throw new Error('Failed to process OpenRouter response');
        }
    }

    /**
     * Format error for better debugging and client feedback
     * 
     * @param {Error} error - The caught error
     * @returns {Error} - A formatted error with additional context
     */
    formatError(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const formattedError = new Error(`OpenRouter API Error: ${error.response.status}`);
            formattedError.status = error.response.status;
            formattedError.data = error.response.data;
            return formattedError;
        } else if (error.request) {
            // The request was made but no response was received
            const timeoutError = new Error('OpenRouter API timeout or network error');
            timeoutError.status = 504;
            return timeoutError;
        } else {
            // Something happened in setting up the request
            return error;
        }
    }

    /**
     * Create a tarot reading prompt based on the question and selected cards
     * 
     * @param {string} question - The user's question
     * @param {string} questionType - The type of question (love, career, etc.)
     * @param {Array} selectedCards - The selected tarot cards with their details
     * @param {string} userName - The user's name (optional, defaults to "seeker")
     * @returns {string} - A formatted prompt for the model
     */
    createTarotPrompt(question, questionType, selectedCards, userName = null) {
        // Extract card details with position context
        const positions = [
            "What is going on around",
            "What the obstacle is",
            "The likely outcome"
        ];
        
        const cardDetails = selectedCards
            .map((card, index) => {
                // Get the appropriate meaning based on orientation and question type
                let meaning;
                if (card.isReversed) {
                    meaning = card.meanings?.reversed?.[questionType] || 
                              card.meanings?.reversed?.general || 
                              "No specific meaning available";
                } else {
                    meaning = card.meanings?.upright?.[questionType] || 
                              card.meanings?.upright?.general || 
                              "No specific meaning available";
                }

                // Return formatted card details with position context
                return `Card ${index + 1} (${positions[index]}): ${card.name} (${card.isReversed ? 'Reversed' : 'Upright'})
Description: ${card.description || 'No description available'}
Meaning: ${meaning}`;
            })
            .join('\n\n');

        // Determine how to address the user
        const userAddress = userName ? userName : "seeker";
        const greeting = userName ? `Dear ${userName}` : "Dear seeker";
        
        // Create a detailed and structured prompt for the AI model
        return `You are Master Elena, a renowned tarot reader with 25 years of experience. You have guided thousands of souls through life's mysteries with your profound intuition and deep understanding of the cards' ancient wisdom.

${userName ? `${userName} has` : 'A seeker has'} come to you with this question: "${question}"

You have drawn a powerful three-card spread for ${userName ? 'them' : 'them'}:

${cardDetails}

As Master Elena, provide a concise yet profound tarot reading (exactly 250-300 words) that:
- Begins with "${greeting},"
- Speaks directly to ${userAddress} with warmth and mystical wisdom
- Weaves all three cards into one compelling narrative about their ${questionType || 'life'} journey
- Offers specific, actionable guidance they can apply immediately
- Uses your signature style: mystical yet grounded, compassionate yet honest
- Ends with a complete, empowering message that gives them hope and clear direction

Make every word count. Be concise but profound. Ensure your reading feels complete and ends with a strong, inspiring conclusion. No cut-offs or incomplete sentences.`;
    }
}

module.exports = new AIClient();
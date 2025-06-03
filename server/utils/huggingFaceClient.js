/**
 * Hugging Face API Client Utility
 * 
 * This module provides a wrapper for interacting with Hugging Face's inference API
 * for generating AI-powered tarot readings.
 */

const axios = require('axios');
const logger = require('./logger');
require('dotenv').config();

// Default model if not specified in environment variables
const DEFAULT_MODEL = 'meta-llama/Llama-3.1-8B-Instruct';

/**
 * HuggingFaceClient class for handling API interactions
 */
class HuggingFaceClient {
    constructor() {
        this.apiKey = process.env.HF_API_KEY;
        this.apiUrl = process.env.HF_API_URL || `https://api-inference.huggingface.co/models/${DEFAULT_MODEL}`;
        
        if (!this.apiKey) {
            logger.warn('Warning: HF_API_KEY not found in environment variables. Hugging Face API calls will fail.');
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
            // Default parameters for tarot reading generation
            const parameters = {
                max_new_tokens: options.maxTokens || 300,
                temperature: options.temperature || 0.7,
                top_p: options.topP || 0.9,
                do_sample: true,
                ...options.parameters
            };

            // Make the API request
            const response = await axios.post(
                this.apiUrl,
                { 
                    inputs: prompt, 
                    parameters 
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: options.timeout || 30000
                }
            );

            // Process the response based on the model's output format
            return this.processResponse(response.data, prompt);
        } catch (error) {
            logger.error('Error in Hugging Face API call:', error);
            throw this.formatError(error);
        }
    }

    /**
     * Process the response from the Hugging Face API
     * 
     * @param {any} data - The response data from the API
     * @param {string} prompt - The original prompt (for cleaning the response)
     * @returns {string} - The processed generated text
     */
    processResponse(data, prompt) {
        let generatedText = '';
        
        // Handle different response formats from Hugging Face models
        if (Array.isArray(data) && data.length > 0) {
            // Format for some models like Llama
            if (data[0].generated_text) {
                generatedText = data[0].generated_text;
            }
        } else if (data && data.generated_text) {
            // Direct format for some models
            generatedText = data.generated_text;
        } else if (typeof data === 'string') {
            // Simple string response
            generatedText = data;
        } else {
            throw new Error('Unexpected API response format');
        }

        // Clean up the generated text
        return this.cleanGeneratedText(generatedText, prompt);
    }

    /**
     * Clean up the generated text by removing the prompt and extra whitespace
     * 
     * @param {string} text - The raw generated text
     * @param {string} prompt - The original prompt
     * @returns {string} - The cleaned text
     */
    cleanGeneratedText(text, prompt) {
        return text
            .replace(prompt, '')  // Remove the prompt if it's included
            .replace(/^(\s*\n)+/, '')  // Remove leading newlines
            .replace(/(\s*\n)+$/, '')  // Remove trailing newlines
            .trim();
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
            const formattedError = new Error(`Hugging Face API Error: ${error.response.status}`);
            formattedError.status = error.response.status;
            formattedError.data = error.response.data;
            return formattedError;
        } else if (error.request) {
            // The request was made but no response was received
            const timeoutError = new Error('Hugging Face API timeout or network error');
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
     * @returns {string} - A formatted prompt for the model
     */
    createTarotPrompt(question, questionType, selectedCards) {
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

        // Create a detailed and structured prompt for the AI model
        return `
You are an experienced tarot reader with deep knowledge of tarot symbolism and interpretation. 
Provide a personalized, insightful tarot reading based on the following:

Question: "${question}"
Question Type: ${questionType || 'general'}

The Three-Card Spread:
${cardDetails}

Instructions:
1. Analyze how these three cards interact with each other in the context of the question.
2. Consider the card positions (past/present/future or situation/obstacle/outcome).
3. Interpret both upright and reversed orientations appropriately.
4. Provide a cohesive narrative that connects all three cards.
5. Offer practical insights and guidance based on the reading.
6. Keep your response between 150-200 words.
7. Use a compassionate, wise tone without being overly mystical.
8. Do not simply repeat the card meanings, but synthesize them into a meaningful interpretation.
9. Focus on empowerment rather than predicting fixed outcomes.

Format your response as a single, well-structured paragraph without mentioning these instructions.`;
    }
}

module.exports = new HuggingFaceClient();
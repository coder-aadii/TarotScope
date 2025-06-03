# Deployment Guide for TarotScope AI Reading Feature

This guide provides instructions for deploying the AI-generated tarot reading feature to various cloud platforms.

## Prerequisites

Before deploying, ensure you have:

1. A Hugging Face API key with access to the Llama-3.1-8B-Instruct model
2. Updated your environment variables with the API key and model URL
3. Tested the feature locally to ensure it works correctly

## Environment Variables

The following environment variables must be set in your cloud environment:

```
HF_API_KEY=your_huggingface_api_key
HF_API_URL=https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct
```

## Deployment Options

### Option 1: Render

[Render](https://render.com/) is a unified cloud platform that makes it easy to deploy web services.

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: tarotscope-backend (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node server.js`
4. Add the environment variables in the Render dashboard
5. Deploy the service

### Option 2: Heroku

1. Create a new app on Heroku
2. Connect your GitHub repository
3. Set up the environment variables in the Heroku dashboard
4. Deploy the app
5. Configure the Procfile (create if it doesn't exist):
   ```
   web: cd server && node server.js
   ```

### Option 3: AWS Elastic Beanstalk

1. Create a new application in Elastic Beanstalk
2. Create a new environment (Web server environment)
3. Upload your code as a .zip file or connect to your GitHub repository
4. Configure environment variables in the Elastic Beanstalk console
5. Deploy the application

## Post-Deployment Steps

After deploying to your chosen platform:

1. Update the client-side API URL to point to your new backend URL
2. Test the AI-generated tarot reading feature in the production environment
3. Monitor the application logs for any errors
4. Set up monitoring and alerts for the Hugging Face API usage

## Performance Considerations

The Llama-3.1-8B-Instruct model is resource-intensive. Consider the following:

1. **Response Time**: The model may take 10-20 seconds to generate a reading. Implement appropriate loading states in your frontend.
2. **API Limits**: Be aware of Hugging Face API rate limits and implement appropriate error handling.
3. **Caching**: Consider implementing caching for common questions to reduce API calls.
4. **Fallback**: Implement a fallback mechanism in case the Hugging Face API is unavailable.

## Troubleshooting

If you encounter issues after deployment:

1. **API Key Issues**: Verify that your Hugging Face API key is valid and has the necessary permissions.
2. **Model Access**: Ensure you have access to the Llama-3.1-8B-Instruct model.
3. **Timeout Errors**: Increase the timeout settings for your server and API requests.
4. **Memory Issues**: If you're experiencing out-of-memory errors, consider upgrading your server resources.

## Monitoring

Set up monitoring for:

1. API response times
2. Error rates
3. Server resource usage
4. Hugging Face API usage and limits

## Cost Management

Be aware of the costs associated with:

1. Cloud hosting services
2. Hugging Face API usage (if you're on a paid plan)
3. Data transfer and storage

Implement appropriate measures to control costs, such as setting up budget alerts and monitoring usage patterns.
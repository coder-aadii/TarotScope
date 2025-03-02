const axios = require('axios'); // Make sure to install axios by running: npm install axios

// Test user data (hardcoded)
const testUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "Password123",
};

const apiUrl = process.env.REACT_APP_API_URL;

// Register user function
const registerUser = async () => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, testUser);

    // Check if registration was successful
    console.log('User registration successful:', response.data);

  } catch (error) {
    // Log any error that occurs
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else {
      console.error('Error during registration:', error.message);
    }
  }
};

// Run the function to register the user
registerUser();

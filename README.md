# ![TarotScope Logo](/client/src/assets/images/logo-img.png)

*Discover the aura of your future, one card at a time.*

## [Click here to visit  TarotScope](https://TarotScope.netlify.app)

---

![GitHub issues](https://img.shields.io/github/issues/yourusername/TarotScope)
![GitHub forks](https://img.shields.io/github/forks/yourusername/TarotScope)
![GitHub stars](https://img.shields.io/github/stars/yourusername/TarotScope)
![GitHub license](https://img.shields.io/github/license/yourusername/TarotScope)
![Contributors](https://img.shields.io/github/contributors/yourusername/TarotScope)

---

## **Table of Contents**

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## **Overview**

**TarotScope** is a next-generation web application that brings tarot card readings to life with modern technology and interactive design. It offers users an engaging experience by allowing them to choose tarot cards from a visually animated deck to get personalized readings.

![Deck Animation](./assets/deck-animation.png)

Through **TarotScope**, users can explore their aura, understand their path, and uncover the mysteries of their past, present, and future. The platform is built with scalability and flexibility in mind, with future support for multiple tarot spread techniques and enhanced user features.

---

## **Features**

### 🌟 **Core Features:**

- **User Authentication**:  
  Secure registration and login system with JWT authentication.

- **Interactive Tarot Deck**:  
  Users can drag, shuffle, and select cards from an animated deck resembling real-life card selection.

- **Ask a Question**:  
  Users can choose between Yes/No questions or detailed queries before performing a reading.

- **Three-Card Spread**:  
  The primary spread allows users to see insights about their past, present, and future.

- **History and Insights**:  
  Keep track of all previous readings in the user’s profile dashboard for easy reference.

- **Custom Animations**:  
  Realistic tarot card sliding animation for an immersive experience.

- **Responsive Design**:  
  Optimized for mobile, tablet, and desktop.

### 🚀 **Planned Future Enhancements:**

- Additional tarot spread techniques (Celtic Cross, Five-Card Spread).
- Integration with astrological charts.
- Personalized reading suggestions based on user history.

---

## **Screenshots**

| **Login Page**                        | **Tarot Reading Dashboard**             | **Card Selection Animation**           |
|---------------------------------------|----------------------------------------|----------------------------------------|
| ![Login Page](./assets/login-page.png) | ![Dashboard](./assets/dashboard.png)    | ![Card Selection](./assets/card-select.png) |

---

## **Tech Stack**

### **Frontend**:
- ![React](https://img.shields.io/badge/React.js-16.x-blue)  
  Fast and interactive user interface built with React.

- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-2.x-green)  
  Customizable UI styling framework for rapid development.

### **Backend**:
- ![Node.js](https://img.shields.io/badge/Node.js-14.x-brightgreen)  
  Scalable backend logic using Node.js.

- ![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)  
  Lightweight and efficient server-side routing.

### **Database**:
- ![MongoDB](https://img.shields.io/badge/MongoDB-4.x-brightgreen)  
  NoSQL database for managing tarot card information and user history.

### **Authentication**:
- ![JWT](https://img.shields.io/badge/JWT-Secure%20Token-red)  
  JSON Web Tokens for secure authentication.

---

## **Installation**

To get a local copy up and running, follow these simple steps:

### **Prerequisites**

- Ensure you have **Node.js** and **npm** installed.
- Ensure **MongoDB** is installed and running on your machine or connected via a cloud service (like MongoDB Atlas).

### **Installation Steps**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/TarotScope.git
   cd TarotScope
   ```

2. **Install NPM packages**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file and configure it with your database and authentication secrets:

   ```bash
   DB_CONNECTION=mongodb://localhost:27017/TarotScope
   JWT_SECRET=your_secret_key
   ```

4. **Run the app**:

   ```bash
   npm start
   ```

---

## **Usage**

### **User Flow:**

1. **Register/Login**:  
   Users can register for an account or log in with existing credentials.

2. **Ask a Question**:  
   The user selects between Yes/No or a detailed question.

3. **Select Tarot Spread**:  
   Choose the Three-Card Spread (other techniques are static for now).

4. **Pick Cards**:  
   Users select three cards from the animated deck, and their horoscope is revealed based on the selection.

5. **View Previous Readings**:  
   Users can review their tarot reading history on the dashboard.

---

## **Project Structure**

```bash
TarotScope/
│
├── assets/                  # Icons and images
│   ├── logo.png
│   ├── deck-animation.png
│   └── ...
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── index.js
│       └── ...
├── server/                  # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
├── .env                     # Environment variables
├── package.json
└── README.md
```

---

## **Future Enhancements**

- **New Tarot Spreads**: Add Celtic Cross, Five-Card, and Horseshoe tarot spread techniques.
- **Astrological Integration**: Link tarot reading with astrological data for enhanced insights.
- **Mobile App**: Create a mobile version of the application.
- **Analytics**: Provide personalized suggestions based on user data and history.

---

## **Contributing**

We welcome contributions to **TarotScope**! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/yourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/yourFeature`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

---

## **Contact**

Feel free to reach out if you have any questions or suggestions:

- **GitHub**: [coder-aadii](https://github.com/coder-aadii)
- **Email**: adityaaerpule@gmail.com

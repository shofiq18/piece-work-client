


# Piece Work
<div align="center">
  <img src="https://i.ibb.co.com/TMch55k1/Screenshot-7.png" />
</div>

## Overview
Piece Work is a micro-task and earning platform that allows users to create and complete small tasks in exchange for rewards. Employers can post tasks with specific requirements, and workers can complete them to earn coins, which can be withdrawn or used within the platform.

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication
- **Styling:** Tailwind CSS, DaisyUI, Styled Components
- **State Management:** React Query
- **Payment Processing:** Stripe
- **Image Uploading:** ImageBB API
- **Animations:** Framer Motion, Animate.css

## Features
- Task posting with title, details, completion deadline, and payment structure.
- Secure authentication using Firebase.
- Real-time coin deduction and balance updates.
- Workers can browse and complete tasks.
- Employers can manage their posted tasks.
- Coin purchase system for task creators using Stripe.
- Responsive UI with Tailwind CSS and DaisyUI.
- Notifications and alerts using SweetAlert2 and React Toastify.

## Dependencies
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI
- Styled Components
- React Query
- Axios
- Framer Motion
- Firebase
- Stripe.js & React Stripe.js
- ImageBB API
- SweetAlert2
- React Icons
- Swiper.js
- React Responsive Carousel

## How to Run the Project Locally
### Prerequisites:
1. Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/).

### Steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shofiq18/piece-work-client.git
   cd piece-work
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory and add:
     ```
     VITE_apiKey=AIzaSyCdT2Uq4Olkefukj7LD-sdYYqnaIVHAF1A
     VITE_authDomain=piece-work-e8024.firebaseapp.com
     VITE_projectId=piece-work-e8024
     VITE_storageBucket=piece-work-e8024.firebasestorage.app
     VITE_messagingSenderId=617392905502
     VITE_appId=1:617392905502:web:e8f080c70aab2c7b80fd0f
     VITE_IMAGE_KEY=b5076748c9d50f8f1ab6dcfda7e13daa
     VITE_PAYMENT_GATEWAY_PK=pk_test_51QjLa7QpCsfqk5cbMknXU3mIMXE4j3vBWcD9ZB1voBcMx11SuDQQbi5EmQ4s4FL8PmUjA1LQY6keFMfakrPdU0Lz007fi5VPk1
     ```
4. **Start the backend server:**
   ```bash
   nodemon index.js
   ```
5. **Start the frontend:**
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173/` in your browser.

## Live Project
[Live Demo](#) (https://piece-work-e8024.web.app/)

## Additional Resources
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [React.js Docs](https://reactjs.org/docs/)
- [Express.js Docs](https://expressjs.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)


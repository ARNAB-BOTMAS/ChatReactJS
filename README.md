# Chat Website

This repository contains the code for a real-time chat website built using React.js and Firebase. The website allows users to chat with each other in real-time.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction
The chat website provides a simple and intuitive interface for users to communicate with each other in real-time. It utilizes Firebase for real-time data synchronization and authentication.

## Features
- Real-time chat functionality
- User authentication with Firebase Authentication
- Ability to create multiple chat rooms
- Responsive design for optimal viewing across devices
- Simple and intuitive user interface

## Technologies Used
- React.js
- Firebase (Firestore for database, Firebase Authentication for user authentication)
- HTML5
- CSS3
- JavaScript

## Setup
To set up the project locally, follow these steps:
1. Clone the repository: `git clone https://github.com/ARNAB-BOTMAS/ChatReactJS.git`
2. Navigate to the project directory: `cd chat-website`
3. Install dependencies: `npm install`
4. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore database and Firebase Authentication.
   - Copy Firebase configuration details.
   - Create a `.env` file in the project root and add Firebase configuration details:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```
5. Start the development server: `npm start`
6. Open your web browser and navigate to `http://localhost:3000`.

## Usage
- Sign up or log in with your email and password to start chatting.
- Create a new chat room or join an existing one.
- Start chatting with other users in real-time.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

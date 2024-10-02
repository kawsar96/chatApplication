# Chat Application

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Real-time chat functionality using WebSockets.
- User authentication and session management.
- User-friendly interface built with EJS templates.
- Responsive design for various devices.
- View conversations with timestamps.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Mongoose (MongoDB ODM)
  - Socket.IO for real-time communication
- **Frontend:**
  - EJS (Embedded JavaScript templating)
  - HTML/CSS
  - JavaScript
- **Database:**
  - MongoDB

## Installation

To get started with the Chat Application, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kawsar96/chatApplication.git
   cd chatApplication
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:** Create a .env file in the root directory of the project and add your MongoDB connection string and cookie secret:
   ```bash
   MONGO_CONNECTION_STRING=<your_mongo_connection_string>
   COOKIE_SECRET=<your_cookie_secret>
   PORT=3000
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Open your browser:** Navigate to http://localhost:3000 to access the chat application.

## Usage

Once the application is running, you can:

- Register a new account or log in if you already have one.
- Start chatting with other users in real-time.
- View your conversation history.

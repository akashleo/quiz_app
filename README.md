# Quiz App Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Running the App](#running-the-app)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

The Quiz App is a full-stack web application that allows users to take quizzes on various topics. Users can view available quizzes, take them, and see their results. Administrators can create, update, and delete quizzes. The application is built using React for the front end and Node.js with Express for the back end.

## Features

- User authentication and authorization
- Create, read, update, and delete quizzes
- Take quizzes and see results
- Responsive design for mobile and desktop

## Technologies Used

### Front End

- React
- Redux
- Axios
- React Router

### Back End

- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication
- Bcrypt for password hashing

### Other

- Docker for containerization
- Jest for testing

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quiz-app.git
   cd quiz-app
2. Install dependencies for both the client and server:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
3. Set up environment variables. Create a .env file in the server directory and add the following:
    ```sh
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
4. Start the development servers:
    ```sh
    npm start


## Folder Structure

    quiz-app/
    │
    ├── client/             # React front end
    │   ├── public/
    │   └── src/
    │       ├── components/
    │       ├── pages/
    │       ├── redux/
    │       ├── App.js
    │       ├── index.js
    │       └── ...
    │
    ├── server/             # Node.js back end
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── app.js
    │   └── server.js
    │
    ├── .gitignore
    ├── README.md
    └── package.json

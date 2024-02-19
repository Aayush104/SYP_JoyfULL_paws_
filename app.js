const express = require('express');
const app = express();
const { users } = require('./model/Index');
const cors = require('cors');
const { createUser, userLogin } = require('./Controller/AuthController');
const cookieParser = require('cookie-parser');
const { isauthenticate } = require('./Middleware/isauthenticate'); // Importing your authentication middleware

app.use(cors({
    origin: 'http://localhost:5173', // Change this to the origin of your frontend application
  credentials: true 
}));
require('./model/Index');

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();

// Register user
app.post('/register', createUser);

// Login user
app.post('/login', userLogin);

// Protected route example
app.get('/protected', isauthenticate, (req, res) => {
    res.sendStatus(200); // Send success response if user is authenticated
});

// Start server
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});



const express = require('express');
const app = express();
const { users } = require('./model/Index');

const cors = require('cors');
const { createUser, userLogin } = require('./Controller/AuthController');

app.use(cors());
require('./model/Index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config()



//register garna user
app.post('/register', createUser)


//Login garna
app.post('/login', userLogin )

//logout

// app.get('/logout', logout)

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});

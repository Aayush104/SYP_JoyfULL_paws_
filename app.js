

const express = require('express');
const app = express();
const { users } = require('./model/Index');

const cors = require('cors');
const { createUser, userLogin } = require('./Controller/AuthController');

app.use(cors());
require('./model/Index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//register garna user
app.post('/register', createUser)


//Login garna
app.post('/login', userLogin )

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});

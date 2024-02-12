

const express = require('express');
const app = express();
const { users } = require('./model/Index');

const cors = require('cors');

app.use(cors());
require('./model/Index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('Register.jsx')
});
app.get('/login', (req, res) => {
    res.render('Login.jsx')
});


//register
app.post('/register', async (req, res) => {
    const { Username, Email, Password } = req.body;

    try {
        const existingUser = await users.findOne({
            where: {
                Email: Email
            }
        });

        if (existingUser) {
            console.error("email exists");
            return res.status(400).send("Email already exists");
        }

        await users.create({
            UserName: Username,
            Email: Email,
            Password: Password
        });
        res.send('Registration successful');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});


//Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({
            where: {
                Email: email
            }
        });

        if (!user) {
            console.error("User not found");
            return res.status(404).send("User not found");
        }

        if (user.Password !== password) {
            console.error("Incorrect password");
            return res.status(401).send("Invalid Email Or Password");
        }

        console.log("Login successful");
        res.send("Login successful");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});

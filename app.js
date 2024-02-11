// const express = require('express');
// const app = express();
// const { users } = require('./model/Index');
// const bodyParser = require('body-parser');
// const cors = require('cors');


// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // register
// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const existingUser = await users.findAll({
//             where: {
//                 Email: email
//             }
//         });

//         if (existingUser) {
//             console.error("Email exists");
//             return res.status(400).send("Email already exists");
//         } else {
//             await users.create({
//                 UserName: username,
//                 Email: email,
//                 Password: password
//             });
//             res.send('Registration successful');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error registering user');
//     }
// });


// Login


// app.listen(5000, () => {
//     console.log(`Server is running on port 5000`);
// });


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
    const { username, email, password } = req.body;

    try {
        const existingUser = await users.findOne({
            where: {
                Email: email
            }
        });

        if (existingUser) {
            console.error("email exists");
            return res.status(400).send("Email already exists");
        }

        await users.create({
            UserName: username,
            Email: email,
            Password: password
        });
        res.send('Registration successful');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});


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
            return res.status(401).send("Password donot match");
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

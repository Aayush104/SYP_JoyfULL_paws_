    const express = require('express');
const app = express();
const { users, pets } = require('./model/Index');
const cors = require('cors');
const { createUser, userLogin,Addpet, getPetdetail, singleDetail, myPost, userInfo, editBlogdata, actualediting, deleteFile, forgotPassword, handleOtp, updatePass, sentEmail } = require('./Controller/AuthController');
const cookieParser = require('cookie-parser');
const { isauthenticate } = require('./Middleware/isauthenticate'); 
const{multer, storage} = require("./Services/MulterConfig");
const jwt = require('jsonwebtoken');
const upload = multer({storage:storage})
const bcrypt = require('bcrypt');
const sendregister = require('./Services/Registermail');
// const { Server } = require('socket.io');
//front end saga connection ko lagi
app.use(cors({
    origin: 'http://localhost:5173', 
  credentials: true 
}));
require('./model/Index');

// Middleware for parsing cookies
app.use(cookieParser());

//image use gaar  vaner permission deko
app.use(express.static('uploads/'))
//form bata aako data 
app.use(express.json()) // parse gaar or handel gaar vanya form bata aako data
app.use(express.urlencoded({extended:true}))

//dot env file lai acess garna 
require('dotenv').config();

// Register user
app.post('/register', createUser);

// Login user
app.post('/login', userLogin);

// Protected route for middleware euthenticaion
app.get('/protected', isauthenticate, (req, res) => {
    res.sendStatus(200); // Send success response if user is authenticated
});


//Pet haru ko detail datbase ma halney
app.post('/Addpet',upload.single('petphoto'), Addpet);


//detail lai aba screen ma dekhauna

app.get('/main', getPetdetail)

   
//single page pet details

app.get("/Detail/:id", singleDetail)

//mypost page

app.get('/Mypost',myPost)


//useR information
app.get('/user', userInfo)

//edit data prefill
app.get('/Edit/:id', editBlogdata)


//actuall editing data store and update
app.post('/Edit/:id', upload.single('petphoto'), actualediting);


//delete pets
app.delete('/Delete/:id', deleteFile);

//forgot password

app.post('/forgotpass', forgotPassword)

//otp verify and all
app.post("/handleotp/:id", handleOtp)

//Password update garney after otp verify

app.post('/updatepass/:email/:otp',updatePass)

//to sent email from User To user
app.post('/sentEmail/:id',sentEmail)


app.post('/getPass', async (req, res) => {
  const { email } = req.body;

  if(!email){
    res.send("no user")
  }

  try {
    
    const existingUser = await users.findOne({
      where: {
        Email: email
      }
    });

    if (existingUser) {
      console.log("User exists.");
      res.send("User exists");
    } else {
      console.log("Success.");
      const generateOtp = Math.floor(10000 * Math.random(9999))
      
      await sendregister({
        email : email,
        otp :generateOtp
      })
      res.json(generateOtp)
      console.log(generateOtp)
      // res.status(200).send("Success");

    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
 app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
const express = require('express');
const app = express();
const { users, pets } = require('./model/Index');
const cors = require('cors');
const { createUser, userLogin,Addpet, getPetdetail, singleDetail } = require('./Controller/AuthController');
const cookieParser = require('cookie-parser');
const { isauthenticate } = require('./Middleware/isauthenticate'); 
const{multer, storage} = require("./Services/MulterConfig");
const jwt = require('jsonwebtoken');
const upload = multer({storage:storage})
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/Mypost', async (req,res)=>{

    try {
        
        const token =  req.headers.authorization?.split(' ')[1];
        const decodedToken =  jwt.verify(token,process.env.SECRETKEY)
        
        const userId = decodedToken.id
       
       
        const mypost = await pets.findAll({
       
           where : {
               userID : userId
           }
        })
       
        // console.log(mypost)
        res.json(mypost)
    } catch (error) {
        
        console.error(error)
        return res.status(500).send("Internal error occurred");
    }
   
})


app.get('/user',async(req,res)=>{

    try {
        
        const token =  req.headers.authorization?.split(' ')[1];
        const decodedToken =  jwt.verify(token,process.env.SECRETKEY)
        
        const userId = decodedToken.id
        // console.log(userId)
    
        const Username = await users.findAll({
            where :{
                ID : userId
            }
        })
        res.json(Username)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal error occurred");
    }

   

})

// Start server
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});




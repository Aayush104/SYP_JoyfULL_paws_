const express = require('express');
const app = express();
const { users, pets } = require('./model/Index');
const cors = require('cors');
const { createUser, userLogin,Addpet, getPetdetail } = require('./Controller/AuthController');
const cookieParser = require('cookie-parser');
const { isauthenticate } = require('./Middleware/isauthenticate'); 
const{multer, storage} = require("./Services/MulterConfig");
const upload = multer({storage:storage})
//front end saga connection ko lagi
app.use(cors({
    origin: 'http://localhost:5173', 
  credentials: true 
}));
require('./model/Index');

// Middleware for parsing cookies
app.use(cookieParser());


//chcek if token is  or not for responseiv navbar
app.use((req,res,next)=>{

    res.locals.currentUser = req.cookies.token
    next()
    

})




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


//single page blog

app.get("/Detail/:id", async (req,res)=>{

    try {

        const id = req.params.id

        const alldetails = await pets.findAll({
            where :{
                ID : id
            }
        })
    
        console.log(alldetails)
    
        res.json (alldetails)
        
    } catch (error) {
        
        res.status(200).json(error,"internal server error")
    }

   

})
// Start server
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});




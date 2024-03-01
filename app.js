const express = require('express');
const app = express();
const { users, pets } = require('./model/Index');
const cors = require('cors');
const { createUser, userLogin,Addpet, getPetdetail, singleDetail, myPost, userInfo, editBlogdata } = require('./Controller/AuthController');
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

app.get('/Mypost',myPost)


//useR information
app.get('/user', userInfo)


app.get('/Edit/:id', editBlogdata)


app.post('/Edit/:id', async(req,res)=>{ // Note the colon before id
    const id = req.params.id;
const {  petname,
    pethealth,
    petgender,
    petsize,
    petage,
    petlikings,
    aboutpet,
    breed} = req.body
  
   
   const edit_pet = await pets.update({
   PetName: petname,
    Health :pethealth,
    PetSize: petsize,
    PetLikings: petlikings,
Age: petage,
AboutPet: aboutpet,
PetGender:petgender,
Breed: breed},{
    where :{
        ID : id
    }


    
   }) 

   res.send("update successfull")}

   
);

// Start server
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});




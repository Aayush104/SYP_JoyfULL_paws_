const { users, pets } = require("../model/Index");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const { assert } = require("console");
const { Op } = require('sequelize');

//Register User in Database
exports.createUser =  async (req, res) => {
    const { Username, Email, Password, Confirm } = req.body;

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

        if(Password !==  Confirm){
            console.log("PASSWORD dONOT MATCH")
            return res.send("Password donot match")
            
        }

        await users.create({
            UserName: Username,
            Email: Email,
            Password: bcrypt.hashSync(Password, 10)
        }); 
        res.send('Registration successful');
    } catch (error) {
       
        console.error('Error registering user:', error);
       return res.status(500).send('Error registering user');
       
    }
};


//lOGIN uSER
exports.userLogin = async (req, res) => {
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

        const isPassword = bcrypt.compareSync(password, user.Password)

        if (isPassword == false) {
            console.error("Incorrect password");
            return res.status(401).send("Invalid Email Or Password");
        }

        //Generating token here
       const token = jwt.sign({id:user.ID}, process.env.SECRETKEY,{expiresIn: "30d"})
    res.json({token}) //sending  dayain json form
       
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error logging in');
    }
};





//pet ko lagi controller
//add pet in database
exports.Addpet = async (req, res) => {
    const { petname, petgender, pethealth, petsize, petage, petlikings, aboutpet, breed } = req.body;
    const filename = req.file.filename;

    try {
        // Retrieve the token from cookies or headers
        const token =  req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        // Verify the token to get the user information
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);

        if (!decodedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find the user in the database
        const user = await users.findByPk(decodedToken.id);

        console.log(user)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create the pet and associate it with the user
        const newPet = await pets.create({
            PetName: petname,
            PetGender: petgender,
            Health: pethealth,
            Petsize: petsize,
            Age: petage,
            PetLikings: petlikings,
            AboutPet: aboutpet,
            Breed: breed,
            PetPhoto: process.env.IMAGE_URL + filename,
            userID: user.ID 
        });

        res.json("success");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error occurred");
    }
};

//get pet details from database and show in main screen
exports.getPetdetail = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        const userId = decodedToken.id;

        const petDetail = await pets.findAll({
            where: {
                userID:  {
                    [Op.ne]: userId // [op.ne work as not equal to operator]
                }
            }
        });

        console.log(petDetail);
        res.json(petDetail);
    } catch (error) {
        console.error('Error fetching pet details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//detail page ko backend

exports.singleDetail = async (req,res)=>{

    try { 

        const id = req.params.id

        const alldetails = await pets.findAll({
            where :
            {
                ID : id
            },
            
            include :
            {
                model : users
            }
        })
   
    
        res.json (alldetails)
        
    } catch (error) {
        
        res.status(200).json(error,"internal server error")
    }

   

}


//mypost render
exports.myPost = async (req,res)=>{

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
   
}


//user info getting

exports.userInfo = async(req,res)=>{

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

   

}

// prefill garna data lera uta pthako

exports.editBlogdata = async (req, res) => {
    const id = req.params.id;
    console.log(id);
   
    try {
        const get_data = await pets.findAll({
            where :{
                ID : id
            }
        })

        // console.log(get_data)
        res.json(get_data)
        
    } catch (error) {
        console.error(error,"internal server error")
        res.status(500).send("internal server error")
        
    }
}


//editing in pets
exports.actualediting =  async (req, res) => {
    try {
        const id = req.params.id;
        const {
            petname,
            pethealth,
            petgender,
            petsize,
            petage,
            petlikings,
            aboutpet,
            breed
        } = req.body;

        // console.log(req.body);


        const olddata = await pets.findAll({
            where :{
                ID : id
            }
        })

        const file = req.file
        let fileUrl;

        if(file){
            fileUrl = process.env.IMAGE_URL + req.file.filename

        }else{
            fileUrl = olddata[0].PetPhoto
        }
      
        
       
        const edit_pet = await pets.update({
            PetName: petname,
            Health: pethealth,
            PetSize: petsize,
            PetLikings: petlikings,
            Age: petage,
            AboutPet: aboutpet,
            PetGender: petgender,
            Breed: breed,
            PetPhoto : fileUrl
        }, {
            where: {
                ID: id
            }
        });
        const image_data = olddata[0].PetPhoto
        console.log(image_data) //http://localhost:5000/1709089109471-1stpet.jpg 
  
        const lengthofhost = "http://localhost:5000/".length
        console.log(lengthofhost) //22 aayo length
  
  
        const filenameinuploadefolder = image_data.slice(lengthofhost)
        console.log(filenameinuploadefolder) //1709089109471-1stpet.jpg

        fs.unlink('uploads/'+filenameinuploadefolder,(err)=>{
            if(err){
                console.log("ERROR vayo",err)
            }else{
                console.log("File deleted successfully")
            }
        })
  
        if (edit_pet) {
            res.send("update successful");
        } else {
            res.status(404).send("Pet not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}


//delete pet details
exports.deleteFile = async (req, res) => {
    const id = req.params.id;

    const olddata = await pets.findAll({
        where :{
            ID : id
        }
    })
    const image_data = olddata[0].PetPhoto
    console.log(image_data) //http://localhost:5000/1709089109471-1stpet.jpg 

    const lengthofhost = "http://localhost:5000/".length
    console.log(lengthofhost) //22 aayo length


    const filenameinuploadefolder = image_data.slice(lengthofhost)
    console.log(filenameinuploadefolder) //1709089109471-1stpet.jpg

    fs.unlink('uploads/'+filenameinuploadefolder,(err)=>{
        if(err){
            console.log("ERROR vayo",err)
        }else{
            console.log("File deleted successfully")
        }
    })

   

    await pets.destroy({
        where :{
            ID : id
        }
    })
 res.json("successfully deleted")
   
  }




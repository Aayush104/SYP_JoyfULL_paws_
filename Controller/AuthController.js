const { users, pets } = require("../model/Index");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



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






// Assuming you have defined your Sequelize models for pets and users

exports.Addpet = async (req, res) => {
    const { petname, petgender, pethealth, petsize, petage, petlikings, aboutpet, breed } = req.body;
    const filename = req.file.filename;

    try {
        // Retrieve the token from cookies or headers
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

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
            userID: user.ID // Assuming you have a foreign key userId in your pets table
        });

        res.json("success");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal error occurred");
    }
};

//get pet details from database


exports.getPetdetail = async(req,res)=>{

    try {
        const petDetail = await pets.findAll();
        res.json(petDetail);
    } catch (error) {
        console.error('Error fetching pet details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.singleDetail = async (req,res)=>{

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

   

}


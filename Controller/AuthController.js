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


//Add pet in database
exports.Addpet = async (req, res) =>{

    const {petname,
        petgender,
        pethealth,
        petsize,
        petage,
        petlikings,
        aboutpet,
        petphoto} = req.body

        const filename = req.file.filename
        // console.log(petname,
        //     petgender,
        //     pethealth,
        //     petsize,
        //     petage,
        //     petlikings,
        //     aboutpet,
        //     petphoto)

            await pets.create({
                PetName : petname,
                	PetGender :petgender,	
                    Health	: pethealth,
                    Petsize : petsize,
                    Age : petage,
                    PetLikings : petlikings,
                    AboutPet : aboutpet,
                    PetPhoto : filename
            })
}


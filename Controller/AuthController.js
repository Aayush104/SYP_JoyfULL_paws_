const { users, pets } = require("../model/Index");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const { assert } = require("console");
const { Op, DATE } = require('sequelize');
const sendEmailPreparing = require("../Services/SendEmail");
const userTalkPreparing = require("../Services/UserTalk");

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

        // console.log(petDetail);
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
   
    // console.log(alldetails)
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

  //Fprgot password

exports.forgotPassword = async (req,res)=>{
const {email} = req.body

const check = await users.findAll({
    where :{
        Email : email
    }

})

// console.log(check)
if(check.length == 0){
     res.send("Invalid")
}else{

   
    const generateOtp = Math.floor(10000 * Math.random(9999))
console.log(generateOtp)
   
    // console.log(generateOtp)
    //OTP code generate garxa yesley
   await sendEmailPreparing({
    email : check[0].Email,
    subject :"forgot Password otp",
    otp: generateOtp

    })

    //random generate vako otp lai hamiley user ko utp bvaney column ma haldai xau 
   check[0].Otp = generateOtp
   check[0]. OtpGeneratedTime = Date.now()
   await check[0].save() //esley hamro otp ra generate otp column ma fdata save garna kaam garxa without this data column ma gayera basdaina
   res.send('success')

    console.log("email sent successfully")
}


    
  }


  //for to handle otp

exports.handleOtp = async (req,res) =>{
    const otp = req.body.otp
    const email = req.params.id //params.id naqai lekhna parxa tyo params ko value lina 
     
    if(!otp || !email ){
        res.send("Please send email,otp")
    }
    // console.log(otp,email)

    const userdata = await users.findAll({
        where :{
            Email:email,
            Otp : otp
        }
    })
    // console.log(userdata) //esma data aauna duitai value true hunai aprxa
console.log(userdata)
    if(userdata.length == 0){
        console.log("invalid")
       return res.json("Invalid Otp")
    }else{

        const CurrentTime = Date.now() //current time
        const otpGeneratetTime = userdata[0].OtpGeneratedTime //past time

        if(CurrentTime - otpGeneratetTime <= 240000){
         
            
            return res.json("valid")

        }else{
            
            userdata[0].Otp = null //ekchoti use bhaesakya otp lai null banaideko
            userdata[0].OtpGeneratedTime = null
            await userdata[0].save()
            
            console.log("otp expire")
            res.json("otp expire")
        }
       
    }
  }


//edit 
exports.updatePass = async (req,res)=>{

    const confirm = req.body.confirmpass;
    const newPass = req.body.newpass;
    const email = req.params.email
    const otp = req.params.otp
    console.log("This is Otp::", otp)
 
    try {
     if(confirm === newPass){
 
         const check = await users.findAll({
             where :{
                 Email: email,
                 Otp : otp
             }
         })
         // console.log(check)
         
         if(!check){
            return res.send("user not found")
         }
        //  const CurrentTime = Date.now() //current time
        //  const otpGeneratetTime = check[0].OtpGeneratedTime //past time
 
        
             const updatepass = await users.update({
                 Password : bcrypt.hashSync(confirm, 10) ,
                 Otp: null,
                 OtpGeneratedTime: null
               
             },{
                 where:{
                     
                     Email : email
                 }
             })
            res.send("Changed")
         }
         
             
    } catch (error) {
     console.error(error)
     res.status(401).send('An error Occured')
     
    }

 
         
 
 
 
 
  
 
 }


 // it sent email to user 
exports.sentEmail = async (req,res)=>{
 
    const Email = req.body.email
    const sub = req.body.subject
    const text = req.body.text

    const id = req.params.id
  
    const toEmail = await users.findAll({
        where :{
            ID : id
        }
    })

   const emailReceiver = toEmail[0].Email
   console.log(emailReceiver)
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    const userId = decodedToken.id;
    
    const getemail = await users.findAll({
        where :{
            ID : userId
        }
    }) 
   

    const userEmail = getemail[0].Email
    const username = getemail[0].UserName
    // console.log("this is user mail",userEmail)

    if(userEmail !== Email){
        console.log("notvalid")
        res.send("Not valid")

    }else{
        res.send("Successfull")
 await userTalkPreparing({
           
            emailer: userEmail,
             toemail: emailReceiver,
            subject : sub,
            text:  userEmail+" "+text,
            username : username
          
            })
           


         
    }
  }
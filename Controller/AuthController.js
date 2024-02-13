const { users } = require("../model/Index");


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
            Password: Password
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

        if (user.Password !== password) {
            console.error("Incorrect password");
            return res.status(401).send("Invalid Email Or Password");
        }

        console.log("Login successful");
        res.send("Login successful");
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error logging in');
    }
};

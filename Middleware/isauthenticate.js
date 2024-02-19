// Middleware/isauthenticate.js
const jwt = require('jsonwebtoken');
const { users } = require('../model/Index');
const promisify = require('util').promisify;

exports.isauthenticate = async (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).send("No Token");
    }

    try {
        const cookieDecoded = await promisify(jwt.verify)(token, process.env.SECRETKEY);

        const verifyId = await users.findOne({
            where: {
                ID: cookieDecoded.id
            }
        });

        if (!verifyId) {
            return res.status(404).send('User does not exist');
        }

        req.user = verifyId; // Set the user in request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).send('Internal Server Error');
    }
};

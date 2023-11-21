const jwt = require('jsonwebtoken')

const { createError } = require('./error')

const verifyToken = (req, res, next) => {

    //  const token = req.cookies.access_token;



    // If you're now storing the token in the localStorage instead of sending it as a cookie, you'll need to adjust the verification process on the server side to extract the token from the request header.

    // When sending the token in the header from the client side (using localStorage), you typically attach it to the Authorization header. Modify the backend code to retrieve the token from the Authorization header instead of cookies.

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
            console.error("error in authenticated", err);
            return next(createError(403, "Your token is not valid"));
        }
        req.user = user;
        next();
    })
}

module.exports = { verifyToken }
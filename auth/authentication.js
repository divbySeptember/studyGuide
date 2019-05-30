const jwt = require('jsonwebtoken');
const secret = require('../_secrets').jwtSecret;
require('dotenv').config(); 


module.exports = {
  authenticate,
};



//********** AUTHENTICATE MIDDLEWARE ************/
function authenticate(req, res, next) {
  const token  = req.headers.authorization;
  
  
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
    
      
      if (err) {
        res.status(401).json({ massage: 'Invalid token Provided.' });

      } else {
        res.decodedToken = decodedToken;
        next()
      }
    });
  } else {
    res.status(401).json({
      sucess: false,
      message: 'No token provided! You must login to perform action.',
    });
  }
}

var jwt = require('jwt-simple');
var app = require('express');
var sysusercontroller = require('../controllers/sysusercontroller')



module.exports = function (req,res,next) {

console.log('jwtauth')
var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

if (token) {
  try {
    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

    // handle token here
    if (decoded.exp <= Date.now()) {
    res.end('Access token has expired', 400);
    }
    
    
    sysusercontroller.findUserByName({ username: decoded.iss }, function(err, user) {
        if(err) throw err
        req.user = user;
    });
    
    
  } catch (err) {
    return next();
  }
} else {
  next();
}

}
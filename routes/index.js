var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var moment = require('moment');
var app = express();
var jwtauth = require('../midware/jwtauth');
var bodyParser = require('body-parser');




var expires = moment().add('days', 7).valueOf();
//1.JWT
app.set('jwtTokenSecret','tokenSecret');


/* 根据token来访问接口 */
router.post('/', jwtauth,function(req, res) {
 res.send("sucess token")
});

//2.token step1, user passport authenticate,get token************
router.post('/auth', passport.authenticate('local'),function (req,res) {
  var token = jwt.encode({
  iss: req.body.username,
  exp: expires
}, app.get('jwtTokenSecret'));

  res.json({
    token : token,
    expires: expires,
    user: req.body
  });

  //res.send(JSON.stringify(req.body));
});



module.exports = router;

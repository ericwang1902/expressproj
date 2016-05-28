var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res) {
//   var data = {key: 'value', hello: 'world'};//
//   console.info(req.body);
//   console.info(req.body.user);
//   res.send(JSON.stringify(data));;
// });

router.get('/',passport.authenticate('local'),function(req, res) {
  var data = {key: 'value', hello: 'world'};//
  console.info(req.body);
  console.info(req.body.user);
  res.send(JSON.stringify(data));;
});

module.exports = router;

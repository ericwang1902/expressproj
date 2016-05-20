var express = require('express');
var router = express.Router();
var sysuserController = require('../controllers/sysuserController.js');
var passport = require('passport');

/*
 * GET
 */
router.get('/', function(req, res) {
    sysuserController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    sysuserController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
   // sysuserController.create(req, res);
  //  console.log(req.body)
});



//login
//router.post('/login', passport.authenticate('local',{successRedirect:'/',failureRedirect:'http://localhost:8080/sysuser/login',failureFlash:true}));
router.post('/login', passport.authenticate('local'),function (req,res) {
  var data = {key: 'value', hello: 'world'};//
  res.send(JSON.stringify(data));
});

// router.post('/login', passport.authenticate('basic',{session:false}),function (req,res) {
//   var data = {key: 'value', hello: 'world'};//
//   res.send(JSON.stringify(data));
// });

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    sysuserController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    sysuserController.remove(req, res);
});

module.exports = router;
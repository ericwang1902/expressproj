var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;


var routes = require('./routes/index');
var users = require('./routes/users');
var sysuersrouter = require('./routes/sysusers.js')

var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/expressproj');

var seed = require('./seed.js');
var sysuserModel = require('./models/sysuserModel.js');
var sysuserController = require('./controllers/sysuserController.js');

var jwt = require('jwt-simple');
var app = express();



seed.init();



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('jwtTokenSecret','tokenSecret');

//序列化和反序列化
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  sysuserModel.findById(id, function(err, user) {
    done(err, user);
  });
});
//编写策略
passport.use(new LocalStrategy(
    function(username,password,done){
        sysuserController.findUserByName(username,function(err,user){
            console.log('passport')
            console.log('username:'+username)
            console.log('password:'+password)
            if(err) throw err;
            if(!user){
                
                return done(null,false,{message:'username is wrong'})
            }
            sysuserController.comparePsd(password,user.psd,function(err,isMatch){
                if(err) throw err;
                if(isMatch){
                    
                    return done(null,user);
                }
                else{
                    return done(null,false,{message:'psd is wrong'})
                }
                
            })
        })
        
    }
    
))
//相关配置和初始化
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//以上均是passport部分，详见http://idlelife.org/archives/808




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,authorization");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});




app.use('/', routes);
app.use('/users', users);
app.use('/sysuer',sysuersrouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;

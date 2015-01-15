var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
//var favicon=require('serve-favicon');
var express=require('express');
var path=require('path');

var app=express();
var port = process.env.port || 8080; 

mongoose.connect("mongodb://localhost/jobReco",function(err,db){
	if(err){
        console.dir(err);
	}else{
        console.log("DB connected");
	}
})

require('./models/jobPostSchema');
require('./models/userSchema');

var routes=require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',routes);
app.use('/users',users);


// catch 404 and forward to error handler
app.use(function(req,res,next){
	var err=new Error("page not found");
    err.status=404;
    next(err);
})

// error handlers

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




app.listen(port);
module.exports = app;
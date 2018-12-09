var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passportSteup = require('./config/passport');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const keys = require('./config/keys');

var app = express();
//setup socket io frist step with express genrator 
var server = require('http').Server(app);
var io = require('socket.io')(server);

//DB setup
var {mongoose} = require('./config/mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup socket io  step 5th with express genrator
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(session({
  secret:keys.session.secret,
  resave:true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('error');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(createError(404));
  //res.render('error');
});
//setup socket io  step 2  with express genrator to export server to www
module.exports = {app:app,server:server};

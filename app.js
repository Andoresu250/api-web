var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./lib/config');

var app = express();

mongoose.connect(config.database);
//mongoose.createConnection(config.database);

var auth_middle = require('./lib/middleware/auth');
var user = require('./routes/user');
var auth = require('./routes/auth');
var user_admin = require('./routes/user_admin');
var organization = require('./routes/Organization');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/login', auth);
app.use('/users', user);

app.use(auth_middle);

app.use('/users_admin', user_admin);
app.use('/organizations', organization);

//app.use('/user_admin', user_admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;

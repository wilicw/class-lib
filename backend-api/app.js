const history = require('connect-history-api-fallback')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');

var app = express();
var cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// serve your css as static
const static_dir = path.join(__dirname, "/../front-ui/dist")
app.use(history())
app.use(express.static(static_dir));
app.get("/", (req, res) => {
  res.render(path.join(static_dir, "/index.html"));
});
app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);


// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ status: err.status, error: err.message });
});

module.exports = app;

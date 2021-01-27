const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up for dotenv file
const dotenv = require('dotenv');

// Helmet
const helmet = require('helmet');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// Initialise the app
const app = express();

const index = require('./routes/index');
const upload = require('./routes/upload');
const customerDataRouter = require('./routes/customerData');
const allTyres = require('./routes/getAllTyres');
const tyreSearch = require('./routes/getTyreSizes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(helmet());
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/upload', upload);
app.use('/customerData', customerDataRouter);
app.use('/getAllTyres', allTyres);
app.use('/getTyreSizes', tyreSearch);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

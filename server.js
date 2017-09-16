// DEPENDENCIES
const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
require('pretty-error').start();

// CONFIG
const app        = express();
const PORT       = process.env.PORT || 2017;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/books_app_api_test'
mongoose.Promise = global.Promise;

// DB
mongoose.connect(mongoURI, () => console.log('Mongo running at: ', mongoURI));

// CONTROLLERS
const booksController = require('./controllers/books');
const usersController = require('./controllers/users');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/books', booksController);
app.use('/users', usersController);

// HOME
app.get('/', (req, res) => res.status(200).json({ message: 'simple books api' }));

// LISTEN
app.listen(PORT, () => console.log('web server running on port: ', PORT));

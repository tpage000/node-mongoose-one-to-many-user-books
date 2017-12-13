// DEPENDENCIES
const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
require('pretty-error').start();

// CONFIG
const app        = express();
const PORT       = process.env.PORT || 2080;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/books_users_api'

// DB
mongoose.connect(mongoURI, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// CONTROLLERS
const booksController = require('./controllers/books');
const usersController = require('./controllers/users');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/books', booksController);
app.use('/users', usersController);

// HOME
app.get('/', (req, res) => res.status(200).json({ message: 'simple books api' }));

// LISTEN
app.listen(PORT, () => console.log('BOOKS app running on port: ', PORT));

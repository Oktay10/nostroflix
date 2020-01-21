// Expressx
const express = require('express');
const app = express();

// Morgan (show logs)
const morgan = require('morgan');

// Body-parser
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');

//---------
const filmsRoutes = require('./api/routes/filmRoutes');
const categoriesRoutes = require('./api/routes/categorieRoutes');
const postRoutes = require('./api/routes/postRoutes');
const userRoutes = require('./api/routes/userRoutes');

const badgesRoutes = require('./api/routes/badgesRoutes')

// MongoDB atlas connection


/*  mongoose.connect(
     'mongodb://mounach:' +
     process.env.MONGO_ATLAS_PASSWORD + 
     '@nostroflix-shard-00-00-butgu.mongodb.net:27017,nostroflix-shard-00-01-butgu.mongodb.net:27017,nostroflix-shard-00-02-butgu.mongodb.net:27017/test?ssl=true&replicaSet=nostroflix-shard-0&authSource=admin&retryWrites=true',
     {
        useNewUrlParser: true,
        useFindAndModify: false
     }); */


mongoose.connect(
    'mongodb://localhost:27017/nostroflix',
        {
            useNewUrlParser: true,
            useFindAndModify: false
        });

//------------------ Middlewares ----------------

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, DELETE, GET, PATCH'
        );
        return res.status(200).json({});
    }
    next();
});

// routes

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/films', filmsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);

app.use('/api/posts', postRoutes);


app.use('/api/badges', badgesRoutes);

// Handling errors

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//------

module.exports = app;

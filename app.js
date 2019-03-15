// LOAD MODULES
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// LOAD USER MODEL
require('./models/User');

// PASSPORT CONFIG
require('./config/passport')(passport);

// LOAD KEYS
const keys = require('./config/keys');

// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise;

// CONNECT MONGOOSE DB (mLab)
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


// LOAD ROUTES
const auth = require('./routes/auth');

// LOAD APPLICATION (EXPRESS)
const app = express();

// ROUTES
app.get('/', (req, res) => {
    res.send('Index Landing Page');
});

// --- USE MIDDLEWARE --- //

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null
    next();
});

// USE ROUTES 
app.use('/auth', auth);


// CONNECT SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// LOAD MODULES
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// PASSPORT CONFIG
require('./config/passport')(passport);

// LOAD KEYS
const keys = require('./config/keys');

// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise;

// CONNECT MONGOOSE DB (mLab)
mongoose.connect(keys.mongoURI, {
    useMongoClient: true
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

// USE ROUTES 
app.use('/auth', auth);


// CONNECT SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
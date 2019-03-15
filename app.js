const express = require('express');
const mongoose = require('mongoose');

// mongoose.connect();

const app = express();

// ROUTES
app.get('/', (req, res) => {
    res.send('Index Landing Page');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
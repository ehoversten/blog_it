// LOAD MODULES
const express = require('express');
const router = express.Router();
const passport = require('passport');

// ROUTES
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


// Export the Router
module.exports = router;
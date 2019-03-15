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


router.get('/verify', (req, res) => {
  if(req.user) {
    console.log(req.user);
  } else {
    console.log("Not Authorized");
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

// Export the Router
module.exports = router;
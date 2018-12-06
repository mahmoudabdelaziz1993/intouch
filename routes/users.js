var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/google/redirect',passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
    // Successful authentication, redirect home.
    res.send('respond with a resource');;
});

router.get('/google',passport.authenticate('google', { scope: ['profile'] }));


router.get('/google/redirect',function(req, res) {
    // Successful authentication, redirect home.
    res.send('respond with a resource');;
  });

router.get('/google/vv',passport.authenticate('google'),function(req, res) {
    // Successful authentication, redirect home.
    res.send('respond with a resource');;
  });
module.exports = router;

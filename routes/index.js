var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('register');
});

router.get('/profile',authorized, function(req, res, next) {
  res.render('profile',{user:req.user});
});

router.get('/chatrooms',authorized, function(req, res, next) {
  res.render('chatroom',{user:req.user});
});


module.exports = router;

//----------------------------------------  protect outcomers middleware ------------------------------- 
function authorized(req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};
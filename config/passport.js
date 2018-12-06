const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const {mongoose} = require('./mongoose');
const {User} = require('../models/User');


passport.use(new GoogleStrategy({
    clientID:keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/vv"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile);
  	User.findOne({social_id: profile.id}).then((docs)=>{
  		if(docs){
  			console.log('a;ready a user');

  		}else{
  		var user =new User({
        username: profile.displayName,
        social_id: profile.id,
        image: profile.photos[0].value || null,
        gender:profile.gender
        });
  	    user.save().then((docs)=>{
      	console.log(docs);
        });	
  		}
  	});

    }
 
));
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// models
const User = require('../models/users');

passport.use(
    new GoogleStrategy({
    clientID: '330005410640-ckroo2mln5edc054prm78cpdb3stciu8.apps.googleusercontent.com',
    clientSecret: 'eP2SrqXD1X9RjyKYIxehL_QV',
    callbackURL: '/auth/google/callback'
    }, 
    ((accessToken, refreshToken, profile, done) => {
        const data = profile._json;
        
        User.findOrCreate({
            'googleId': data.sub
        },{
            firstName: data.given_name,
            lastName: data.family_name,
            profilePhotoUrl: data.picture
        }, (err, user) => {
            return done(err, user);
        })
    
    })
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports = passport;
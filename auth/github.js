const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

// models
const User = require('../models/users');

passport.use(
    new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_LOGIN_SECRET_ID,
    callbackURL: process.env.GITHUB_LOGIN_CALLBACK_URL
    }, 
    ((accessToken, refreshToken, profile, done) => {
        const data = profile._json;
        console.log(data);
        User.findOrCreate({
            'githubId': data.id
        },{
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ')[1],
            profilePhotoUrl: data.avatar_url
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
const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');
const passportGithub = require('../auth/github');

router.get('/google', passportGoogle.authenticate(
    'google',
    {
        scope: ['profile']
    }
));

router.get('/google/callback', passportGoogle.authenticate(
    'google',
    {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/chat');
});

router.get('/github', passportGithub.authenticate(
    'github',
    {
        scope: ['profile']
    }
));

router.get('/github/callback', passportGithub.authenticate(
    'github',
    {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/chat');
});


module.exports = router;


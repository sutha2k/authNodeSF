const express = require('express')
const jsforce = require('jsforce')

let app = express.Router()

app.get('/oauth2/success', function(req, res) {
    var returnData = {
        code : req.query.code
    };
    res.send(returnData);
})

app.get('/oauth2/login', function(req, res) {
    const oauth2 = new jsforce.OAuth2({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET_ID,
        redirectUri: process.env.REDIRECT_URI
    });
    const conn = new jsforce.Connection({ oauth2 : oauth2 });
    conn.login(req.query.username, req.query.password, function(err, userInfo) {
        if (err) { res.status(200).json(err); } else {
            var returnData = {
                instance_url : conn.instanceUrl,
                access_token : conn.accessToken
            };
            res.status(200).json(returnData);
        }
    });
})

app.get('/oauth2/authorize', function(req, res) {
    const oauth2 = new jsforce.OAuth2({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET_ID,
        redirectUri: process.env.REDIRECT_URI
    });
    console.log('REDIRECT_URI:'+oauth2.getAuthorizationUrl({}))
    res.redirect(oauth2.getAuthorizationUrl({}));
})

app.post('/oauth2/token', function(req,res) {
    const oauth2 = new jsforce.OAuth2({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET_ID,
        redirectUri: process.env.REDIRECT_URI
    });
    const conn = new jsforce.Connection({ oauth2 : oauth2 });
    conn.authorize(req.query.code, function(err, userInfo) {
        if (err) { res.status(200).json(err); } else {
            var returnData = {
                instance_url : conn.instanceUrl,
                access_token : conn.accessToken
            };
            res.status(200).json(returnData);
        }
    });
})

module.exports = app
const express = require('express')
const auth = require('./auth')
const privateresources = require('./privateresources')

if (process.env.SERVER_ENV !== 'production') {
    require('dotenv').config()
}

const http = require('http')
const https = require('https')
const fs = require('fs')

const options = {
    key: fs.readFileSync('selfsigned.key'),
    cert: fs.readFileSync('selfsigned.crt')
}

const app = express()
app.use('/',auth)
app.use('',privateresources)

app.get('/', function (req, res) {
    res.send('Welcome to Node.JS Auth with Salesforce');
});

http.createServer(app).listen(8080);
https.createServer(options, app).listen(8443);

app.listen(8000, () => {
    console.log('Server is running')
})


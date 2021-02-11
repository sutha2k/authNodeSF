const express = require('express')
const auth = require('./auth')
const privateresources = require('./privateresources')

if (process.env.SERVER_ENV !== 'production') {
    require('dotenv').config()
    const http = require('http')
    const https = require('https')
    const fs = require('fs')

    const options = {
        key: fs.readFileSync('selfsigned.key'),
        cert: fs.readFileSync('selfsigned.crt')
    }

    http.createServer(app).listen(8080);
    https.createServer(options, app).listen(8443);
}

const app = express()
app.use('/',auth)
app.use('',privateresources)

app.get('/', function (req, res) {
    res.send('Welcome to Node.JS Auth with Salesforce');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

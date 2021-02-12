const jsforce = require('jsforce')

module.exports = function(req, res, next) {
  const token = req.headers["bearer"];
  const instanceUrl = req.headers["instanceurl"];

  process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    res.status(400).send("Invalid token.");
  })

  if (!token || !instanceUrl) return res.status(401).send("Access denied. No token provided.");

  try {
    const conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken : token
    });
    
    conn.identity(function(err, res) {
        if (err) { throw new Error(err.message); }
    });
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
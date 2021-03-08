const jsforce = require('jsforce')

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1) //mandatory (as per the Node.js docs)
})

module.exports = function(req, res, next) {
  const token = req.headers["bearer"];
  const instanceUrl = req.headers["instanceurl"];

  if (!token || !instanceUrl) return res.status(401).send("Access denied. No token provided.");

  console.log("bearer ", token);
  console.log("instanceUrl ", instanceUrl);
  try {
    const conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken : token
    });
    
    conn.identity(function(err, res) {
        try {
          if (err) { throw new Error(err.message); }
          next();
        } catch (ex){
          res.status(400).send("Invalid token.");
        }
    });
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
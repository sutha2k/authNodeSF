const jsforce = require('jsforce')

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

module.exports = function(req, res, next) {
  const token = req.headers["bearer"];
  const instanceUrl = req.headers["instanceurl"];

  if (!token || !instanceUrl) return res.status(401).send("Access denied. No token provided.");

  try {
    const conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken : token
    });
    
    conn.identity(function(err, res) {
        if (err) { console.log("step1");throw new Error(err.message); }
        console.log("Invalid token0.", res);
    });
    console.log("step2");
    next();
  } catch (ex) {
    console.log("step3");
    res.status(400).send("Invalid token.");
  }
};
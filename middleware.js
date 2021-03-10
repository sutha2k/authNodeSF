const jsforce = require('jsforce')

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1) //mandatory (as per the Node.js docs)
})

module.exports = function(req, res, next) {
  const token = req.headers["bearer"];
  const instanceUrl = req.headers["instanceurl"];

  console.log(JSON.stringify(req.headers));

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
          console.log("user ID: " + res.user_id);
          console.log("organization ID: " + res.organization_id);
          console.log("username: " + res.username);
          console.log("display name: " + res.display_name);
          next();
        } catch (ex){
          console.log("err1 ",ex.message);
        }
    });
  } catch (ex) {
    console.log("err2 ",ex.message);
  }
  return res.status(401).send("Access denied. Invaid token.");
};
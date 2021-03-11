const jsforce = require('jsforce')

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1) //mandatory (as per the Node.js docs)
})

module.exports = function(req, res) {
  const token = req.headers["bearer"];
  const instanceUrl = req.headers["instanceurl"];

  if (!token || !instanceUrl){
    next(new Error("No instanceurl or token provided"), req, res);
    return;
  }

  try {
    const conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken : token
    });
    
    conn.identity(function(err, req, res, next) {
        try {
          if (err) { throw new Error(err.message); }
          console.log("user ID: " + res.user_id);
          console.log("organization ID: " + res.organization_id);
          console.log("username: " + res.username);
          console.log("display name: " + res.display_name);
          next(null, req, res);
        } catch (ex){
          next(new Error("Identity error: "+ex.message), req, res);
          return;
        }
    });
  } catch (ex) {
    next(new Error("Authentication error: "+ex.message), req, res);
    return;
  }
  return;
};
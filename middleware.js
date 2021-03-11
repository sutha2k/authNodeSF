const jsforce = require('jsforce')

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1) //mandatory (as per the Node.js docs)
})

module.exports = function(req, res, next) {
  const token = req.headers["bearer"];
  const instanceUrl = req.headers["instanceurl"];

  if (!token || !instanceUrl){
    next(new Error("No instanceurl or token provided"));
    return;
  }

  try {
    const conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken : token
    });
    
    conn.identity(function(errors, results) {
        try {
          if (errors) { throw new Error(errors.message); }
          console.log("user ID: " + results.user_id);
          console.log("organization ID: " + results.organization_id);
          console.log("username: " + results.username);
          console.log("display name: " + results.display_name);
          next(null,null,res)
        } catch (ex){
          next(new Error("Identity error: "+ex.message));
          return;
        }
    });
  } catch (ex) {
    next(new Error("Authentication error: "+ex.message));
    return;
  }
  return;
};
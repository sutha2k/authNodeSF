const middleware = require("./middleware");
const express = require("express");
const router = express.Router();

router.get("/secured", middleware, async (err, req, res, next) => {
    //if (err.message){
      //  console.log(err.message);
        //res.status(401).send("Access denied: "+err.message);
        //return;
    //}
    console.log('Accessing secured resource ', res);
    res.send('Accessing secured resource');
});

module.exports = router;
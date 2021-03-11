const middleware = require("./middleware");
const express = require("express");
const router = express.Router();

router.get("/secured", middleware, async (err, req, res, next) => {
    if (err){
        console.log(err.message);
        return res.status(401).send("Access denied: "+err.message);
    }
    console.log('Accessing secured resource');
    res.send('Accessing secured resource');
});

module.exports = router;
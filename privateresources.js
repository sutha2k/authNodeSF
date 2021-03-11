const middleware = require("./middleware");
const express = require("express");
const router = express.Router();

router.get("/secured", middleware, async (err, req, res, next) => {
    console.log(err.message);
    return res.status(401).send("Access denied: "+err.message);
},async (req, res) => {
    console.log('Accessing secured resource ');
    return res.send('Accessing secured resource');
});

module.exports = router;
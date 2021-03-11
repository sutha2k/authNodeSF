const middleware = require("./middleware");
const express = require("express");
const router = express.Router();

router.get("/secured", middleware, async (err, req, res, next) => {
    if (err){
        return res.status(401).send("Access denied");
    }
    res.send('Accessing secured resource');
});

module.exports = router;
const middleware = require("./middleware");
const express = require("express");
const router = express.Router();

router.get("/secured", middleware, async (req, res) => {
    res.send('Accessing secured resource');
});

module.exports = router;
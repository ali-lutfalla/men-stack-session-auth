// meant to hold the middlware

const express = require("express");
const router = express.Router();

router.get('/sign-up',(req, res) => {
    res.render("sign-up.ejs");
})

module.exports = router;
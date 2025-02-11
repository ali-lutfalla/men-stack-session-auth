const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

require('./config/db.js');

//Controllers imports
const authController = require("./controllers/auth.js");

// MIDDLEWARE SECTION

app.use(methodOverride("_method"));
app.use(morgan('dev'));
// new
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authController);


// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));


// Route 
app.get("/", async (req, res, next) => {
    const user = req.session.user;
    res.render("index.ejs",{user});
  });

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
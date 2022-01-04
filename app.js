const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const app = express();
const User = require("./model/user");
const cors = require("cors");
const user = require("./routes/user");
const values = require("./routes/values");
const path = require("path");

app.use(require("serve-static")(__dirname + "/../../public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/user", user);
app.use("/values", values);
app.use(express.static(__dirname + "/dist/biotorrApp"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/biotorrApp/index.html"));
});
app.listen(port || 3000, (req, res) => {
  console.log("Server is running on..." + port);
});

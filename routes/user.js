const express = require("express");
const router = express.Router();
const User = require("../model/user");
const passport = require("passport");
const { request } = require("express");
router.get("/", (req, res) => {
  res.send("hello from user");
});

const auth = () => {
  return (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
      if (error) res.status(400).json({ statusCode: 200, message: error });
      req.login(user, function (error) {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  };
};

router.post("/signup", async (req, res) => {
  try {
    const { username, password, organization, email, designation } = req.body;
    let user = new User({ username, organization, email, designation });
    const registeredUser = await User.register(user, password);
    await user.save((err, registeredUser) => {
      if (err) console.log(err);
      else res.status(200).send(registeredUser);
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/signin", auth(), (req, res) => {
  res
    .status(200)
    .json({ statusCode: 200, message: "success", user_id: req.user._id });
});
router.get("/signout", (req, res) => {
  req.logout();
});

module.exports = router;

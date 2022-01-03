const express = require("express");
const { request } = require("express");
const router = express.Router();
const Values = require("../model/values");
const User = require("../model/user");
router.get("/save", (req, res) => {
  console.log("hello");
  //console.log(request.user);
});
router.post("/save", async (req, res) => {
  console.log(req.body);
  const { values, user_id } = req.body;
  const { ph, turbidity } = values;
  const createdOn = new Date();
  const value = new Values({ ph, turbidity, createdOn, user_id });
  await value.save();
});

module.exports = router;

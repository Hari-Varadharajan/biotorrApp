const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sankar:muthumani@cluster0.o0izu.mongodb.net/Biotorr",
  { useNewUrlParser: true },
  () => console.log("Connected to DB")
);
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  designation: String,
  organization: String,
  email: String,
  // values: [{ type: mongoose.Schema.Types.ObjectId, ref: "values" }],
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema, "users");
module.exports = User;

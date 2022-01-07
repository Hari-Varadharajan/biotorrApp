const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;
const valueSchema = new Schema({
  ph: { value: Number, status: Boolean },
  temp: { tankTemp: Number, cabinTemp: Number, status: Boolean },
  turbidity: { value: Number, status: Boolean },
  disOxygen: { value: Number, status: Boolean },
  agitation: Number,
  coolingFan: { value: Number, status: Boolean },
  aqi: { value: Number, status: Boolean },
  hpa: Number,
  uv: { status: Boolean },
  createdOn: Date,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user_id" },
});
const Values = mongoose.model("Values", valueSchema);
module.exports = Values;

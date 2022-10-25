const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//small change
const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  signedUp: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);

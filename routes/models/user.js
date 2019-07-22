const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  lastname: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  age: {
    type: Number,
    required: true
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;

let mongoose = require("mongoose");

//Create User
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
});

module.exports = Person = mongoose.model("User", userSchema);
